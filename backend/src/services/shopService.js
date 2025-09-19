const BadRequestException = require('../exceptions/BadRequestException.js');
const NotFoundException = require('../exceptions/NotFoundException.js');
const shopDao = require('../daos/ShopDao.js');

require('dotenv').config();

class ShopService {
    async getShops() {
        const shops = await shopDao.findAllShops();

        if (!shops || shops.length === 0) {
            throw new NotFoundException('No shops found');
        }

        return shops;
    }


    async getShopById(id) {
        const shop = await shopDao.findShopById(id);

        if (!shop) throw new NotFoundException('No shop found with this ID');

        return shop;
    }


    async getShopProducts(id) {
        const shop = await shopDao.findShopById(id);

        if (!shop) throw new NotFoundException('No shop found with this ID');

        if (!shop.products || shop.products.length === 0) {
            throw new NotFoundException('No products found for this shop');
        }

        return shop.products;
    }


    async createShop(data) {
        const {
            name,
            description,
            logo_image_url,
            adress,
            owner
        } = data;

        if (!name || !description || !logo_image_url || !adress || !owner) 
            throw new BadRequestException('All fields are required');

        const newShop = { 
            name,
            description,
            logo_image_url,
            adress,
            owner
        };

        return shopDao.createShop(newShop);
    }


    async updateShop(id, data) {
        const {
            name,
            description,
            logo_image_url,
            adress,
            owner
        } = data;

        if (!id) throw new BadRequestException('Shop ID is required');

        if (!name || !description || !logo_image_url || !adress || !owner) 
            throw new BadRequestException('All fields are required');

        const shop = await shopDao.findShopById(id);

        if (!shop) throw new NotFoundException('No shop found');

        const updateData = { 
            name,
            description,
            logo_image_url,
            adress,
            owner
        };

        return shopDao.updateShop(id, updateData);
    }

    async deleteShop(id) {
        if (!id) throw new BadRequestException('Shop ID is required');

        const shop = await shopDao.findShopById(id);

        if (!shop) throw new NotFoundException('No shop found');

        return shopDao.deleteShop(id);
    }
}

module.exports = new ShopService();