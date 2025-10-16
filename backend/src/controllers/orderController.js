const orderService = require('../services/orderService'); 

class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
        
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
}

module.exports = new OrderController(orderService);