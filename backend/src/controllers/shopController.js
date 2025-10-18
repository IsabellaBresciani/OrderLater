const shopService = require('../services/shopService'); 

class ShopController {

    constructor(shopService) {
        this.shopService = shopService;
    }

    getAllShops = async (request, response) => {

        const shops = await this.shopService.getShops();

        return response
            .status(200)
            .json({ 
                status: 'Success',
                message: 'Shops successfully retrieved',
                shops: shops
            });
    }

    getShopById = async (request, response) => {
        const { id } = request.params;
        
        const shop = await this.shopService.getShopById(id);

        return response
            .status(200)
            .json({ 
                status: 'Success',
                message: 'Shop successfully retrieved',
                shops: shop
            });
    }

    getShopProducts = async (request, response) => {
        const { id } = request.params;

        const products = await this.shopService.getShopProducts(id);

        return response
            .status(200)
            .json({ 
                status: 'Success',
                message: 'Products successfully retrieved',
                products: products
            });
    }

    createShop = async (request, response) => {
        const data = request.body;

        await this.shopService.createShop(data);
        
        return response
            .status(201)
            .json({ 
                status: 'Success',
                message: 'Shop successfully created'
            });
    }

    updateShop = async (request, response) => {
        const { id } = request.params;
        const data = request.body;

        await this.shopService.updateShop(id, data);
        
        return response
            .status(200)
            .json({ 
                status: 'Success',
                message: 'Shop successfully updated'
            });
    }

    deleteShop = async (request, response) => {
        const { id } = request.params;

        await this.shopService.deleteShop(id);

        return response
            .status(204)
            .json({ 
                status: 'Success',
                message: 'Shop successfully deleted'
            });
    }

    getShopsByOwner = async (request, response) => {
        const owner_id = request.params.id;
        const user_id = request.user.id;

        if (owner_id.toString() !== user_id.toString())
            throw new ForbiddenException('You do not have permission to access these shops');   
        
        const shops = await this.shopService.getShopsByOwnerId(id);

        return response
            .status(200)
            .json({ 
                status: 'Success',
                message: 'Shops successfully retrieved',
                shops: shops
            });
    }
}

module.exports = new ShopController(shopService);