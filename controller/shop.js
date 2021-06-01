
const Product = require("../model/product");

exports.getProducts = (req,res,next) => {
    let email = "Not logged in";
    if(req.session.email){
        email = req.session.email;
    }
    Product.find()
        .then(products => {
            res.render('./pages/shop/products', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
                isAutheticated: req.session.isLoggedIn,
                useremail: email
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    let email = "Not logged in";
    if(req.session.email){
        email = req.session.email;
    }
    const prodId = req.params.productId;
    Product.findById(prodId).then(product=> {
        res.render('./pages/shop/product-detail', {
            item: product,
            path: '/products',
            isAutheticated: req.session.isLoggedIn,
            useremail: email
        });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => { 
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/prove/cart')
        })
};

exports.getCart = (req, res, next) => {
    let email = "Not logged in";
    if(req.session.email){
        email = req.session.email;
    }
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render('./pages/shop/cart', {
                path: '/cart',
                isAutheticated: req.session.isLoggedIn,
                useremail: email,
                products: products
            });
        })
        .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user 
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/prove/cart');
        })
        .catch(err=> console.log(err));
};