const  Order = require('../models/Order.js');

class OrderDAO {

    createOrder(order) {
        return Order.create(order);
    }
}

module.exports = new OrderDAO();