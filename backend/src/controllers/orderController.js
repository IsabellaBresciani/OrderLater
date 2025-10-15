const orderService = require('../services/orderService'); 
const Actions = require('../constants/Actions.js')

class OrderController {

    constructor(orderService) {
        this.orderService = orderService;
    }
    
    getOrdersByUserId = async (request, response) => {
        const userId = request.params.id;

        const orders = await this.orderService.getOrdersByUserId(userId);
        

        orthersToSend = orders.map(order => ({
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
                data: { orthersToSend }
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
}

module.exports = new OrderController(orderService);