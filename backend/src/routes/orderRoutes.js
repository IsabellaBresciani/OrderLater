const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const asyncHandler = require('../handlers/asyncHandler');
const authMiddleware = require('../middleware/authMiddleware');

//--------------------------------  ENDPOINTS  --------------------------------

router.get('/:id', authMiddleware, asyncHandler(OrderController.getOrderById));
router.post('/', asyncHandler(OrderController.createOrder));

module.exports = router;