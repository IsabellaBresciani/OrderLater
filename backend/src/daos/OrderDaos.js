const  Order = require('../models/Order.js');

class OrderDAO {

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