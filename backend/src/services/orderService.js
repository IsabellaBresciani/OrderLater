const productService = require('./productService');
const orderDAO = require('../daos/OrderDaos')
const NotFoundException = require('../exceptions/NotFoundException');
const emailService = require('./emailService');
const fs = require('fs');
const handlebars = require('handlebars');

class OrderService {
    constructor(productService, emailService){
        this.productService = productService;
        this.emailService = emailService;
    }

    createOrder = async (data) => {
        
        if (!data.user_id) new NotFoundException('User not found');
        if (!data.commerce_id) new NotFoundException('Commerce not found');

        const order_items = await Promise.all(
            data.products.map(
                async item => {
                    const product = await this.productService.getProductById(item.id);
                    return {
                        name: product.name,
                        quantity: item.quantity,
                        subtotal: calculateSubtotal(product.unit_price, item.quantity, product.discount, product.advance_in_days, data.deliver_date),
                        clarification: item.clarification || ''
                    };
                }    
        ));

        const total_price = order_items.reduce((total, item) => total + item.subtotal, 0);

        const newOrder = {};
        newOrder.user = data.user_id;
        newOrder.items = order_items;
        newOrder.total = total_price;
        newOrder.commerce = data.commerce_id;
        newOrder.deliver_date = data.deliver_date;

        const createdOrder = await orderDAO.createOrder(newOrder);

        this.notifyCreatedOrderToUser(createdOrder);
        
        return createdOrder;
    };

    async notifyCreatedOrderToUser(order) {
        const templateSource = fs.readFileSync('src/templates/email/created_order_template.html', 'utf8');
        const template = handlebars.compile(templateSource);

        const emailData = {
            userName: data.user_name || 'Usuario',
            products: newOrder.items,
            total: newOrder.total.toFixed(2),
            deliverDate: newOrder.deliver_date,
            year: new Date().getFullYear()
        };

        const htmlBody = template(emailData);

        await this.emailService.sendEmail({
            to: "franco.petosa15@gmail.com",
            subject: "Nueva Orden Creada",
            body: htmlBody
        });
    }
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

module.exports = new OrderService(productService, emailService);