const express = require('express');
const router = express.Router();
const marketplaceController = require('../controllers/marketplaceController');
const { validateProduct, handleValidationErrors } = require('../middleware/validation');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

// Public routes
router.get('/', optionalAuth, marketplaceController.getAllProducts);
router.get('/:productId', optionalAuth, marketplaceController.getProductById);

// User routes
router.post('/', authMiddleware, validateProduct.create, handleValidationErrors, marketplaceController.createProduct);
router.get('/seller/my-products', authMiddleware, marketplaceController.getMyProducts);
router.put('/:productId', authMiddleware, marketplaceController.updateProduct);
router.delete('/:productId', authMiddleware, marketplaceController.deleteProduct);

module.exports = router;
