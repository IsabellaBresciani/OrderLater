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