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
            image_url,
            unit_price,
            discount,
            advance_in_days,
            measure,
            shop
        } = data;

        if (!sku || !name || !description || !image_url || 
            unit_price === undefined || unit_price === null ||
            discount === undefined || discount === null ||
            advance_in_days === undefined || advance_in_days === null ||
            !measure || !shop) {
            throw new BadRequestException('All fields are required');
        }

        const productExist = await productDao.findProductBySku(sku);

        if (productExist) throw new ConflictException('Already exist product with SKU');

        const newProduct = { 
            sku, 
            name,
            description,
            image_url,
            unit_price,
            discount,
            advance_in_days,
            measure,
            shop
        };

        return productDao.createProduct(newProduct);
    }

    async updateProduct(id, data) {
        const {
            sku,
            name,
            description,
            image_url,
            unit_price,
            discount,
            advance_in_days,
            measure,
            shop
        } = data;

        if (!id) throw new BadRequestException('Product ID is required');

        if (!sku || !name || !description || !image_url || 
            unit_price === undefined || unit_price === null ||
            discount === undefined || discount === null ||
            advance_in_days === undefined || advance_in_days === null ||
            !measure || !shop) {
            throw new BadRequestException('All fields are required');
        }

        const product = await productDao.findProductById(id);

        if (!product) throw new NotFoundException('No product found');

        const productSku = await productDao.findProductBySku(sku);

        if (productSku && product._id.toString() !== productSku._id.toString()) {
            throw new ConflictException('Another product with this SKU already exists');
        }

        const updateData = { 
            sku, 
            name,
            description,
            image_url,
            unit_price,
            discount,
            advance_in_days,
            measure,
            shop
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