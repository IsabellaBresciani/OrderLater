const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const asyncHandler = require('../handlers/asyncHandler');
const authMiddleware = require('../middleware/authMiddleware');

//--------------------------------  ENDPOINTS  --------------------------------


router.get('/', asyncHandler(shopController.getAllShops));
router.get('/:id', asyncHandler(shopController.getShopById));
router.get('/users/:id', authMiddleware, asyncHandler(shopController.getShopsByOwner));
router.get('/:id/products', asyncHandler(shopController.getShopProducts));
router.post('/', authMiddleware, asyncHandler(shopController.createShop));
router.put('/:id', authMiddleware, asyncHandler(shopController.updateShop));
router.delete('/:id', authMiddleware, asyncHandler(shopController.deleteShop));

module.exports = router;