const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const asyncHandler = require('../handlers/asyncHandler');

//--------------------------------  ENDPOINTS  --------------------------------

router.post('/login', asyncHandler(authController.login));

router.post('/register', asyncHandler(authController.register));

module.exports = router;