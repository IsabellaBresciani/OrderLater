const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const asyncHandler = require('../handlers/asyncHandler');

//--------------------------------  ENDPOINTS  --------------------------------

router.post('/', asyncHandler(OrderController.createOrder));

module.exports = router;