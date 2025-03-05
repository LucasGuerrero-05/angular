// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middlewares/verifyToken.js');

// GET /api/products (con verificación de token si deseas)
router.get('/', verifyToken, productController.getProducts);

// POST /api/products (opcionalmente también con verifyToken)
router.post('/', verifyToken, productController.addProducts);

module.exports = router;
