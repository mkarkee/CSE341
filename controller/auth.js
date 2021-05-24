const User = require('../model/user');

const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    res.render('./pages/auth/login', {
        path:'/login',
        pageTitle: 'Login',
        isAutheticated: req.isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
        .then(user => {
            if(!user) {
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if(doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/prove/products');
                        });  
                    }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });
        });
};

exports.getSignup = (req, res, next) => {
    res.render('./pages/auth/signup', {
        path:'/signup',
        pageTitle: 'Sign-UP',
        isAutheticated: false
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User
        .findOne({email: email})
        .then(userDoc => {
            if(userDoc) {
                return res.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12)
                .then(hasedPassword => {
                    const user = new User({
                        email: email,
                        password: hasedPassword,
                        cart: {items: []}
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login');
                });  
        })   
        .catch(err => {
            console.log(err);
        });
};