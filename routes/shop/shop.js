const express = require('express');

const shopController = require('../../controller/shop');

const router = express.Router();

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart');

router.post('/cart', shopController.postCart);

module.exports = router;