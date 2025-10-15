const  Order = require('../models/Order.js');

class OrderDAO {

    getOrdersByUserId(userId) {
        return Order.find({ user: userId });
    }

    createOrder(order) {
        return Order.create(order);
    }
}

module.exports = new OrderDAO();