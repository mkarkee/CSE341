
const Product = require("../model/product");
const Order = require('../model/order');

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

exports.postOrders = (req, res, next) => {
    req.user
      .populate('cart.items.productId')
      .execPopulate()
      .then(user => {
        const products = user.cart.items.map(i => {
          return { quantity: i.quantity, product: { ...i.productId._doc } };
        });
        const order = new Order({
          user: {
            email: req.user.email,
            userId: req.user
          },
          products: products
        });
        return order.save();
      })
      .then(result => {
        return req.user.clearCart();
      })
      .then(() => {
        res.redirect('/prove/orders');
      })
      .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    let email = "Not logged in";
    if(req.session.email){
        email = req.session.email;
    }
    Order.find({'user.userId': req.user._id})
        .then(orders => {
            res.render('./pages/shop/orders', {
                path: '/orders',
                isAutheticated: req.session.isLoggedIn,
                pageTitle: 'Your Orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
};