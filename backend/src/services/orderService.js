const productService = require('./productService');
const emailService = require('./emailService');
const shopService = require('./shopService');
const orderDAO = require('../daos/OrderDaos')
const NotFoundException = require('../exceptions/NotFoundException');
const fs = require('fs');
const handlebars = require('handlebars');
const BadRequestException = require('../exceptions/BadRequestException');
const ForbiddenException = require('../exceptions/ForbiddenException');

class OrderService {
    constructor(productService, emailService, shopService){
        this.productService = productService;
        this.emailService = emailService;
        this.shopService = shopService;
    }

    getOrdersByUserId = async (userId, userIdFromToken) => {
        if (!userId && !userIdFromToken) throw new BadRequestException('User ID is required');

        if (userId !== userIdFromToken ) {
            throw new ForbiddenException('You are not authorized to view these orders');
        }

        const orders = await orderDAO.getOrdersByUserId(userId);

        return orders || [];
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

    payOrder = async (id, userIdFromToken) => {
        if (!id) throw new BadRequestException('Order ID is required');
        
        if (!userIdFromToken) throw new BadRequestException('User ID is required to cancel the order');

        const order = await orderDAO.getOrderById(id);
        
        if (!order) throw new NotFoundException('Orders not found for the given user ID');

        if (order.user._id.toString() !== userIdFromToken) {
            throw new ForbiddenException('You are not authorized to cancel this order');
        }

        if(order.state !== "waiting for payment") {
            throw new BadRequestException(`Only orders in 'waiting for payment' state can be payed.`);
        }

        order.state = "pending to deliver";

        const payedOrder = await orderDAO.updateOrder(id, order);

        this.notifyUpdatedOrderState(
            "francopietrantuono999@gmail.com",
            "Tu orden ha sido pagada correctamente.",
            "Le informamos que el pago de su orden en Order Later ha sido exitoso. Le informaremos sobre el estado de su compra cuando se aproxime la fecha de entrega.",
            payedOrder,
            "Order Later - Orden de compra pagada"
        );

        const notifyData = {
            to: order.user.email,
            subject: "Order Later - Orden de compra pagada",
            title: "Tu orden ha sido pagada correctamente.",
            body: "Le informamos que el pago de su orden en Order Later ha sido exitoso. Le informaremos sobre el estado de su compra cuando se aproxime la fecha de entrega.",
            order: payedOrder
        }
        
        this.notifyUpdatedOrderState(notifyData);


        return payedOrder;
    }

    cancelOrder = async (id, userIdFromToken) => {
        if (!id) throw new BadRequestException('Order ID is required');
        
        if (!userIdFromToken) throw new BadRequestException('User ID is required to cancel the order');

        const order = await orderDAO.getOrderById(id);
        
        if (!order) throw new NotFoundException('Orders not found for the given user ID');

        if (order.user._id.toString() !== userIdFromToken) {
            throw new ForbiddenException('You are not authorized to cancel this order');
        }

        if(order.state !== "waiting to approve" && order.state !== "waiting for payment") {
            throw new BadRequestException(`Only orders in 'waiting for approve' or 'waiting for payment' state can be payed.`);
        }

        order.state = "cancelled";

        const cancelledOrder = await orderDAO.updateOrder(id, order);

        const notifyData = {
            to: order.user.email,
            subject: "Order Later - Orden de compra cancelada",
            title: "Tu orden ha sido cancelada correctamente.",
            body: "Le informamos que su orden de compra en Order Later ha sido cancelada exitosamente.",
            order: cancelledOrder
        }

        this.notifyUpdatedOrderState(notifyData);

        return cancelledOrder;
    }

    notifyUpdatedOrderState(notifyData) {
        const templateSource = fs.readFileSync('src/templates/email/updated_order_state_template.html', 'utf8');
        const template = handlebars.compile(templateSource);

        const emailData = {
            title: notifyData.title,
            description: notifyData.body,
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
            to: notifyData.to,
            subject: notifyData.subject,
            body: htmlBody
        });
    }

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

    getShopOrders = async (shop_id, owner_id) => {
        const shop = await this.shopService.getShopById(shop_id);

        if (!shop.checkOwner(shop, owner_id)) {
            throw new ForbiddenException('Shop does not belong to the user with the provided ID');
        }

        const serach_filter = { shop: shop_id };
        const fields = "total total_discount user shop deliver_date state createdAt updatedAt";

        const orders = await orderDAO.searchShops(serach_filter, fields);

        return orders.map(shopOwnerPopulateOrderActions);
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

function shopOwnerPopulateOrderActions(order) {
    const actions = ['view_details'];

    if (order.state === 'waiting to approve') {
        actions.push('approve', 'reject');
    }

    if (order.state === 'waiting for payment') {
        actions.push('cancel');
    }

    if (order.state === 'pending to deliver') {
        actions.push('deliver');
    }

    if (order.state === 'completed') {
        actions.push('delete');
    }

    if (order.state === 'rejected' || order.state === 'cancelled') {
        actions.push('delete');
    }
    
    return {
        ...order._doc,
        actions: actions
    };
}

module.exports = new OrderService(productService, emailService, shopService);