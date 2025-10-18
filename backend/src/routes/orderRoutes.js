const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const asyncHandler = require('../handlers/asyncHandler');
const authMiddleware = require('../middleware/authMiddleware');

//--------------------------------  ENDPOINTS  --------------------------------

router.get('/:id', authMiddleware, asyncHandler(OrderController.getOrderById));
router.get('/users/:id', authMiddleware, asyncHandler(OrderController.getOrdersByUserId));
router.get('/shops/:id', authMiddleware, asyncHandler(OrderController.getShopOrders));
router.post('/', asyncHandler(OrderController.createOrder));
router.patch('/pay/:id', authMiddleware, asyncHandler(OrderController.payOrder));
router.patch('/cancel/:id', authMiddleware, asyncHandler(OrderController.cancelOrder));

module.exports = router;