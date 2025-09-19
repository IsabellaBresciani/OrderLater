const Shop = require('../models/Shop.js');

class ShopDAO {

    async findShopById(id) {
        return await Shop.findById(id);
    }

    async findShopBySku(sku) {
        return await Shop.findOne({ sku });
    }
    
    async findAllShops() {
        return await Shop.find();
    }

    async createShop(Shop) {
        return await Shop.create(Shop);
    }

    async updateShop(id, updateData) {
        return await Shop.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteShop(id) {
        return await Shop.deleteOne({ _id: id });
    }
}

module.exports = new ShopDAO();