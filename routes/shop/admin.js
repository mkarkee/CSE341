const path = require('path');

const express = require('express');


const adminController = require('../../controller/admin');
const isAuth = require('../../middleware/is-auth');

const router = express.Router();

router.get('/add-product', isAuth, adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/product-list', isAuth, adminController.getProductlist);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);





module.exports = router;
