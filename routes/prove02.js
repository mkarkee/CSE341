const express = require('express');
const fs = require('fs');
const router = express.Router();

function loadJSON(filename = ''){
    if(fs.existsSync(filename)) {
        return JSON.parse(fs.readFileSync(filename).toString());
    }
    else {
        return JSON.parse('""');
    }
}

function saveJSON(filename, json = '""'){
    return fs.writeFileSync(filename, JSON.stringify(json ,null, 2));
}

router.get('/', (req, res, next) => {
    res.render('pages/prove02', {
        title: 'Prove02 - Assignment',
        path: '/prove02'
    });
});


router.post('/display-book', (req, res, next) => {
    const book = JSON.stringify(req.body, null, 2);
    const data = loadJSON('books.json');
    const books = [...data];

    data.push(req.body);
    
    saveJSON('books.json', data)
    
    res.render('pages/display-book', {
        title: req.body.book_title,
        summary: req.body.summary,
        booklist: books,
        path: '/display-book'
        
    });
});

exports.routes = router;

