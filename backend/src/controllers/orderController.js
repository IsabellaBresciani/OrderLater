const BadRequestException = require('../exceptions/BadRequestException');
const InternalServerExcepcion = require('../exceptions/InternalServerExcepcion');
const orderService = require('../services/orderService'); 

class OrderController {

    constructor(orderService) {
        this.orderService = orderService;
    }
        
    createOrder = async (request, response) => {

        return response
        .status(200)
        .json({ 
            status: 'Success',
            message: 'User successfully login',
            authToken: authToken, 
            currentUser: currentUser
        });
    };
}

module.exports = new OrderController(orderService);