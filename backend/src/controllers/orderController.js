const BadRequestException = require('../exceptions/BadRequestException');
const orderService = require('../services/orderService'); 
const Actions = require('../constants/Actions.js');
const { request } = require('express');

class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    
    getOrdersByUserId = async (request, response) => {
        const userId = request.params.id;
        const userIdFromToken = request.user.userId;

        const ordersWithActions = await this.orderService.getOrdersByUserId(userId, userIdFromToken);

        return response
        .status(200)
        .json({ 
            status: 'Success',
            message: 'Orders retrieved successfully',
            data: { ordersWithActions }
        });
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
        const id = request.user.userId;

        const email = request.user.email;
        const first_name = request.user.first_name;
        const last_name = request.user.last_name;
        const products = request.body.products
        const shop_id = request.body.shop_id
        const deliver_date = request.body.deliver_date

        const dto = {
            user: { id, email, first_name, last_name },
            products,
            shop_id,
            deliver_date
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
    
    payOrder = async (request, response) => {
        const { id } = request.params;
        const userIdFromToken = request.user.userId;

        await this.orderService.payOrder(id, userIdFromToken);

        return response
            .status(200)
            .json({ 
                status: 'Success',
                message: 'Order payed successfully',
            });
    };

    cancelOrder = async (request, response) => {
        const { id } = request.params;
        const userIdFromToken = request.user.userId;

        await this.orderService.cancelOrder(id, userIdFromToken);

        return response
            .status(200)
            .json({ 
                status: 'Success',
                message: 'Order cancelled successfully',
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

    rejectOrder = async (request, response) => {
        const { order_id } = request.params;
        
        return response
        .status(200)
        .json({ 
            status: 'Success',
            message: 'Order successfully rejected',
            data: orders
        });
    }
}

module.exports = new OrderController(orderService);