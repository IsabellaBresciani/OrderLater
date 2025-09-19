const BadRequestException = require('../exceptions/BadRequestException');
const InternalServerExcepcion = require('../exceptions/InternalServerExcepcion');
const orderService = require('../services/orderService'); 

class OrderController {

    constructor(orderService) {
        this.orderService = orderService;
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