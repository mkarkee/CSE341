const Product = require("../model/product");
const mongodb = require("mongodb");

exports.getAddProduct = (req, res , next) => {
    res.render('./pages/admin/add-product', {
        title: 'Add Product',
        path:'/add-product',
        isAutheticated: req.session.isLoggedIn
    });
};



exports.postAddProduct = (req, res, next) => {
    console.log(req.body)
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({title: title, price: price, imageUrl: imageUrl, description: description, userId: req.session.user});
    product
        .save()
        .then(result => {
            console.log('Created Product');
            res.render('./pages/admin/add-product', {
                title: 'Add Product',
                path: '/admin/add-product',
                isAutheticated: req.session.isLoggedIn
            });
        })
        .catch(err=> {
            console.log(err);
        });
};

exports.getProductlist = (req,res,next) => {
    Product.find()
        .then(products => {
            res.render('./pages/admin/product-list', {
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

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product=> {
        if(!product) {
            return res.redirect('/');
        }
        res.render('./pages/admin/edit-product', {
            item: product,
            path: '/admin/edit-product',
            isAutheticated: req.session.isLoggedIn
        });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    Product.findById(prodId).then(product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDesc;
        return product.save();
    })
    .then(result => {
        console.log("Updated");
        res.redirect('/admin/product-list');
    })
    .catch(err => console.log(err));

};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            console.log("Destroyed Product");
            res.redirect('/admin/product-list');
        })
        .catch(err => console.log(err));
};