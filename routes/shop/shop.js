const express = require('express');

const shopController = require('../../controller/shop');
const isAuth = require('../../middleware/is-auth');

const prove08Controller = require('../../controller/prove08');

const router = express.Router();

router.get('/products',  shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.post('/create-order', isAuth, shopController.postOrders);

router.get('/orders', isAuth, shopController.getOrders);
router.get('/prove08', prove08Controller.processJson)
        .post('/', prove08Controller.getIndex);

module.exports = router;