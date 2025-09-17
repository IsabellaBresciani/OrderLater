const BadRequestException = require('../exceptions/BadRequestException.js');
const NotFoundException = require('../exceptions/NotFoundException.js');
const productDao = require('../daos/ProductDaos.js');
const ConflictException = require('../exceptions/ConflictException.js');
require('dotenv').config();

class ProductService {
    async getProducts() {
        const products = await productDao.findAllProducts();

        if (!products || products.length === 0) {
            throw new NotFoundException('No products found');
        }

        return products;
    }


    async getProductById(id) {
        const product = await productDao.findProductById(id);

        if (!product) throw new NotFoundException('No product found with this ID');

        return product;
    }


    async getProductBySku(sku) {
        const product = await productDao.findProductBySku(sku);

        if (!product) throw new NotFoundException('No product found with this SKU');

        return product;
    }


    async createProduct(data) {
        const {
            sku,
            name,
            description,
            image_url_char,
            unit_price,
            discount,
            advance_in_days,
            measure
        } = data;

        if (!sku || !name || !description || !image_url_char || !unit_price || !discount || !advance_in_days || !measure) 
            throw new BadRequestException('All fields are required');

        const productExist = await productDao.findProductBySku(sku);

        if (productExist) throw ConflictException('Already exist product with SKU');

        const newProduct = { 
            sku: sku, 
            name: name,
            description: description,
            image_url_char: image_url_char,
            unit_price: unit_price,
            discount: discount,
            advance_in_days: advance_in_days,
            measure: measure
        };

        return productDao.createProduct(newProduct);
    }


    async updateProduct(id, data) {
        const {
            sku,
            name,
            description,
            image_url_char,
            unit_price,
            discount,
            advance_in_days,
            measure
        } = data;

        if (!id) throw new BadRequestException('Product ID is required');

        if (!sku || !name || !description || !image_url_char || !unit_price || !discount || !advance_in_days || !measure) 
            throw new BadRequestException('All fields are required');

        const product = await productDao.findProductById(id);

        if (!product) throw new NotFoundException('No product found');

        const productSku = await productDao.findProductBySku(sku);

        let existAnotherProductWithSku = false; 
        
        if (productSku && product !== productSku) existAnotherProductWithSku = true;

        if (existAnotherProductWithSku) throw new ConflictException('Another product with this SKU already exists');

         const updateData = { 
            sku: sku, 
            name: name,
            description: description,
            image_url_char: image_url_char,
            unit_price: unit_price,
            discount: discount,
            advance_in_days: advance_in_days,
            measure: measure
        };

        return productDao.updateProduct(id, updateData);
    }

    async deleteProduct(id) {
        if (!id) throw new BadRequestException('Product ID is required');

        const product = await productDao.findProductById(id);

        if (!product) throw new NotFoundException('No product found');

        return productDao.deleteProduct(id);
    }
}

module.exports = new ProductService();