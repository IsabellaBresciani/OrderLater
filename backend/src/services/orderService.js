const productService = require('./productService');
const emailService = require('./emailService');
const shopService = require('./shopService');
const orderDAO = require('../daos/OrderDaos')
const NotFoundException = require('../exceptions/NotFoundException');
const fs = require('fs');
const handlebars = require('handlebars');
const BadRequestException = require('../exceptions/BadRequestException');

class OrderService {
    constructor(productService, emailService, shopService){
        this.productService = productService;
        this.emailService = emailService;
        this.shopService = shopService;
    }

    getOrderById = async (id) => {
        const order = await orderDAO.findOrderById(id);
    
        if (!order) throw new NotFoundException('No order found with this ID');
    
        return order;
    }

    createOrder = async (data) => {
        
        if (!data.user_id) throw new NotFoundException('User not found');

        if (!data.shop_id) throw new BadRequestException('Shop ID is required');
       
        await this.shopService.getShopById(data.shop_id)
       
        const order_items = await Promise.all(
            data.products.map(
                async item => {
                    const product = await this.productService.getProductById(item.id);
                    const calculatedSubtotal = calculateSubtotal(product.unit_price, item.quantity, product.discount, product.advance_in_days, data.deliver_date);
                    return {
                        name: product.name,
                        quantity: item.quantity,
                        unit_price: product.unit_price,
                        subtotal: calculatedSubtotal,
                        discount: (item.quantity * product.unit_price) - calculatedSubtotal,
                        subtotalBeforeDiscount: item.quantity * product.unit_price,
                        clarification: item.clarification || ''
                    };
                }    
        ));

        const newOrder = {};
        newOrder.user = data.user_id;
        newOrder.items = order_items;
        newOrder.total = calculateTotalPrice(order_items);
        newOrder.total_discount = calculateTotalDiscount(order_items);
        newOrder.shop = data.shop_id;
        newOrder.deliver_date = data.deliver_date;

        const createdOrder = await orderDAO.createOrder(newOrder);

        this.notifyCreatedOrderToUser(newOrder);
        
        return createdOrder;
    };

    notifyCreatedOrderToUser(order) {
        const templateSource = fs.readFileSync('src/templates/email/created_order_template.html', 'utf8');
        const template = handlebars.compile(templateSource);

        const emailData = {
            userName: order.user_name || 'Usuario',
            products: order.items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                unit_price: item.unit_price,
                subtotal: item.subtotal,
                discount: item.discount,
                subtotalBeforeDiscount: item.subtotalBeforeDiscount
            })),
            total: order.total.toFixed(2),
            deliverDate: order.deliver_date,
            year: new Date().getFullYear()
        };

        const htmlBody = template(emailData);

        return this.emailService.sendEmail({
            to: "franco.petosa15@gmail.com",
            //to: "brescianisa@gmail.com",
            subject: "Nueva Orden Creada",
            body: htmlBody
        });
    }
}

function calculateTotalPrice(items) {
    return items.reduce((total, item) => total + item.subtotal, 0);
}

function calculateTotalDiscount(items) {
    return items.reduce((total, item) => total + item.discount, 0);
}

function calculateSubtotal(unit_price, quantity, discount=0, advance_in_days=0, deliver_date) {
    let subtotal = (unit_price * quantity);
    if(applyDiscount(advance_in_days, deliver_date)) {
        subtotal = subtotal - subtotal * (discount / 100);
    }
    return subtotal;
}

function applyDiscount(advance_in_days, deliver_date){
    const currentDate = new Date();
    const deliverDate = new Date(deliver_date);
    const timeDiff = deliverDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff >= advance_in_days;
}

module.exports = new OrderService(productService, emailService, shopService);