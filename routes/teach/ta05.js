//TA04 PLACEHOLDER
const express = require('express');
const session = require('express-session');
const router = express.Router();

router.get('/ta05',(req, res, next) => {
    req.session.counter = 0;
    req.session.style = 'Green Theme';
    res.render('./pages/teamActivity/ta05', { 
        title: 'Team Activity 05', 
        path: '/ta05', // For pug, EJS 
        activeTA04: true, // For HBS
        contentCSS: true, // For HBS
        style: req.session.style,
        counterValue: req.session.counter
    });
});

router.post('/ta05/theme', (req, res, next) => {
    req.session.style = req.body.theme;
    console.log(session);

    res.render('./pages/teamActivity/ta05', { 
        title: 'Team Activity 05', 
        path: '/ta05', // For pug, EJS 
        activeTA04: true, // For HBS
        contentCSS: true, // For HBS
        style: req.session.style,
        counterValue: 0
    });
});

router.post('/ta05/counter', (req, res, next) => {
    req.session.counter += 1;
   

    res.render('./pages/teamActivity/ta05', { 
        title: 'Team Activity 05', 
        path: '/ta05', // For pug, EJS 
        activeTA04: true, // For HBS
        contentCSS: true, // For HBS
        style: req.session.style,
        counterValue: req.session.counter 
    });
});

router.post('/ta05/reset', (req, res, next) => {
    req.session.destroy(()=> {
        res.redirect('/ta05');
    });
});

module.exports = router;