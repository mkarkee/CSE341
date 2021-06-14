const Product = require("../model/product");
const mongodb = require("mongodb");
const https = require('https')

const ITEMS_PER_PAGE =10;

const renderIndex = (req, res , next) => {
    let pageNumber = req.query.page || 1;

    const firstItem = (pageNumber - 1) * ITEMS_PER_PAGE;
    const lastItem = pageNumber * ITEMS_PER_PAGE;
    let searchedValue = req.body.searchValue || req.query.searchValue || ''
    const filteredData = global.jsonResponse.filter(x => x.name.toLowerCase().includes(searchedValue.toLowerCase()))

    let page = {
        data: filteredData.slice(firstItem, lastItem),
        page: pageNumber,
        numPages: Math.ceil(filteredData.length / ITEMS_PER_PAGE)
    }
    res.render('./pages/prove08', page);
};

exports.getIndex = (req, res, next) => {
    renderIndex(req,res, global.jsonResponse)
}

exports.processJson = (req, res, next) => {
    // read json
    var url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json'

    https
        .get(url, function (response) {
            var body = ''

            response.on('data', function (chunk) {
                body += chunk
            })

            response.on('end', function () {
                global.jsonResponse = JSON.parse(body)
                
                renderIndex(req, res, global.jsonResponse)
            })
        })
        .on('error', function (e) {
            console.log('Got an error: ', e)
        })
}
