
const Product = require("../model/product");

exports.getProducts = (req,res,next) => {
    Product.find()
        .then(products => {
            res.render('./pages/shop/products', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
                isAutheticated: req.session.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(product=> {
        res.render('./pages/shop/product-detail', {
            item: product,
            path: '/products',
            isAutheticated: req.session.isLoggedIn
        });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log("Posted to cart: ");
    console.log(prodId);
    res.redirect('/');
};