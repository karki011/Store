var express = require('express');
var products = require('./controllers/products.ctrl');
var purchases = require('./controllers/purchases.ctrl');
var contact = require('./controllers/contact.ctrl');

var router = express.Router();

router
    .use('/purchases', purchases)
    .use('/contact', contact)
    .use('/products', products);



module.exports = router;