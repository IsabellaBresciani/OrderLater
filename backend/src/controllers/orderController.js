const BadRequestException = require('../exceptions/BadRequestException');
const orderService = require('../services/orderService'); 

class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    
    getOrderById = async (request, response) => {
        const{ id } = request.params;
        const order = await this.orderService.getOrderById(id);

        return response
        .status(200)
        .json({ 
            status: 'Success',
            message: 'Order successfully retrieved',
            data: { order }
        });
    };

    createOrder = async (request, response) => {
        const id = request.userId;
        const email = request.user.email;
        const first_name = request.user.first_name;
        const last_name = request.user.last_name;
        const dto = {
            ...request.body,
            user: { id, email, first_name, last_name }
        }
        const order = await this.orderService.createOrder(dto)

        return response
        .status(201)
        .json({ 
            status: 'Success',
            message: 'Order successfully created',
            data: { order_id: order._id }
        });
    };

    getShopOrders = async (request, response) => {  
        const shop_id = request.params.id;
        const user_id = request.user.userId;

        if (!shop_id) 
            throw new BadRequestException('Shop ID is required');
        
        const orders = await this.orderService.getShopOrders(shop_id, user_id);

        return response
        .status(200)
        .json({ 
            status: 'Success',
            message: 'Orders successfully retrieved',
            data: orders
        });
    }
}

module.exports = new OrderController(orderService);