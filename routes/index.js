const routes = require('express').Router();
const adminRoutes = require('./shop/admin');
const shopRoutes = require('./shop/shop');
const teamActivitiesRoutes = require('./teach/ta05');
const chatRoutes = require('./shop/livechat')
const authRoutes = require('./shop/auth');
const user = require('../model/user');

routes
    .use(authRoutes)

    .use((req, res, next) => {
        if(!req.session.user) {
            return next();
        }
        user.findById(req.session.user._id)
            .then(user=>{
                req.user = user;
                next();
            })
            .catch(err => console.log(err)); 
    })
    .use('/admin', adminRoutes)
    .use('/prove', shopRoutes)
    .use('/chat', chatRoutes)
    
    .use('/', teamActivitiesRoutes)
    .get('/', (req, res, next) => {
    res.render('pages/index', {title: 'Welcome to ', path: '/'});

})

module.exports = routes;