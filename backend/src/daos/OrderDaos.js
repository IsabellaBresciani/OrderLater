const  Order = require('../models/Order.js');

class OrderDAO {

    createOrder(order) {
        return Order.create(order);
    }

    searchShops(filters = {}, fields = null, populateFields = []) {
        const query = { ...filters };
        let dbQuery = Order.find(query);

        if (fields) {
            dbQuery = dbQuery.select(fields);
        }

        populateFields.forEach(field => {
            if (typeof field === 'object') {
                dbQuery = dbQuery.populate(field);
            } else {
                dbQuery = dbQuery.populate({ path: field });
            }
        });

        return dbQuery.sort({ createdAt: -1 });
    }
}

module.exports = new OrderDAO();