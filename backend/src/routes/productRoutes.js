const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const asyncHandler = require('../handlers/asyncHandler');
const authMiddleware = require('../middleware/authMiddleware');

//--------------------------------  ENDPOINTS  --------------------------------


router.get('/', asyncHandler(productController.getAllProducts));
router.get('/:id', asyncHandler(productController.getProductById));
router.get('/sku/:sku', asyncHandler(productController.getProductBySku));
router.post('/', authMiddleware, asyncHandler(productController.createProduct));
router.put('/:id', authMiddleware, asyncHandler(productController.updateProduct));
router.delete('/:id', authMiddleware, asyncHandler(productController.deleteProduct));

module.exports = router;