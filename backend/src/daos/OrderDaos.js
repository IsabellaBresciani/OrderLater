const  Order = require('../models/Order.js');

class OrderDAO {
    getOrderById(id) {
        return Order.findById(id);
    }

    getOrdersByUserId(userId) {
        return Order.find({ user: userId });
    }

    updateOrder(id, updateData) {
        return Order.findByIdAndUpdate(id, updateData, { new: true });
    }

    createOrder(order) {
        return Order.create(order);
    }
}

module.exports = new OrderDAO();