const  Product  = require('../models/Product.js');

class ProductDAO {

    async findProductById(id) {
        return await Product.findById(id);
    }

    async findProductBySku(sku) {
        return await Product.findOne({ sku });
    }
    
    async findAllProducts() {
        return await Product.find();
    }

    async createProduct(product) {
        return await Product.create(product);
    }

    async updateProduct(id, updateData) {
        return await Product.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteProduct(id) {
        return await Product.deleteOne({ _id: id });
    }
}

module.exports = new ProductDAO();