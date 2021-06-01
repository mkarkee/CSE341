const User = require('../model/user');

const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    let email = "Not logged in";
    if(req.session.email){
        email = req.session.email;
    }
    res.render('./pages/auth/login', {
        path:'/login',
        pageTitle: 'Login',
        isAutheticated: false,
        useremail: email
    });
};

exports.postLogin = (req, res, next) => {
    let email = req.body.email;
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
                        req.session.email = email;
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
    let email = "Not logged in";
    if(req.session.email){
        email = req.session.email;
    }
    res.render('./pages/auth/signup', {
        path:'/signup',
        pageTitle: 'Sign-UP',
        isAutheticated: false,
        useremail: email
    });
};

exports.postSignup = (req, res, next) => {
    let email = req.body.email;
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

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
      res.redirect('/prove/products');
  });
};