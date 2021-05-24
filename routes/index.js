const routes = require('express').Router();
const adminRoutes = require('./shop/admin');
const shopRoutes = require('./shop/shop');
const teamActivitiesRoutes = require('./teach/ta05');
const authRoutes = require('./shop/auth');

routes
    .use(authRoutes)
    .use('/admin', adminRoutes)
    .use('/prove', shopRoutes)
    
    .use('/', teamActivitiesRoutes)
    .get('/', (req, res, next) => {
    res.render('pages/index', {title: 'Welcome to ', path: '/'});

})

module.exports = routes;