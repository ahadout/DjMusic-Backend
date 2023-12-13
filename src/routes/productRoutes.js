// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/featured', productController.getFeaturedProduct);
router.get('/hard_drives', productController.getHardDriveProducts);
router.get('/cloud_drives', productController.getCloudDriveProducts);
router.get('/:id', productController.getProduct);

module.exports = router;