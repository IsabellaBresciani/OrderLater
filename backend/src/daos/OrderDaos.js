const  Order = require('../models/Order.js');

class OrderDAO {
    getOrderById(id) {
        return Product.findById(id);
    }

    getOrdersByUserId(userId) {
        return Order.find({ user: userId });
    }

    updateOrder(id, updateData) {
        return Product.findByIdAndUpdate(id, updateData, { new: true });
    }

    createOrder(order) {
        return Order.create(order);
    }
}

module.exports = new OrderDAO();