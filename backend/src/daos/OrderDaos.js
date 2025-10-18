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

    searchShops(filters = {}, fields = null) {
        const query = { ...filters };
        if (fields) {
            return Order.find(query).select(fields).sort({ createdAt: -1 });
        }
        return Order.find(query).sort({ createdAt: -1 });
    }
}

module.exports = new OrderDAO();