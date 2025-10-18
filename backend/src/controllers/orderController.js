const BadRequestException = require('../exceptions/BadRequestException');
const orderService = require('../services/orderService'); 
const Actions = require('../constants/Actions.js');

class OrderController {

    constructor(orderService) {
        this.orderService = orderService;
    }
    
    getOrdersByUserId = async (request, response) => {
        const userId = request.params.id;
        const userIdFromToken = request.user.id;

        const orders = await this.orderService.getOrdersByUserId(userId, userIdFromToken);
        

        ordersToSend = orders.map(order => ({
            id: order._id,
            total: order.total,
            total_discount: order.total_discount,
            shop_name: order.shop.name,
            state: order.state,
            actions:
                order.state === 'waiting to approve' ? 
                    [ Actions.CANCEL ]
                : order.state === 'waiting for payment' ?
                    [ Actions.PAY, Actions.CANCEL ]
                :     
                    [],
            delivery_date: order.deliver_date
        }));

        return response
            .status(200)
            .json({ 
                status: 'Success',
                message: 'Orders retrieved successfully',
                data: { ordersToSend }
            });
    }

    createOrder = async (request, response) => {
        
        const dto = request.body;
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
        const userIdFromToken = request.user.id;

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
        const userIdFromToken = request.user.id;

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
}

module.exports = new OrderController(orderService);