var express = require('express');
var procedures = require('../procedures/purchases.proc');
var stripeSvc = require('../services/stripe.svc');
var emailSvc = require('../services/email.svc');
var router = express.Router();

router.post('/', function(req, res) { //post to /api/purchases
    var productId = req.body.productid;
    var customerEmail = req.body.email;
    var description = req.body.description;
    var itemPrice = Number(req.body.price);
    var stripeTransactionId;
    var price = itemPrice * 100;

    stripeSvc.charge(req.body.token, price)
        .then(function(success) {
            stripeTransactionId = success.id;
            procedures.create(productId, itemPrice, stripeTransactionId)
                .then(function() {
                    console.log('email block');
                    var receipt = {
                            transactionId: stripeTransactionId,
                            price: itemPrice,
                            description: description
                        }
                    emailSvc.sendReceipt(customerEmail, receipt)
                        .then(function(success) {
                            console.log('email sent')
                        }, function(err) {
                            console.log(err);
                            res.status(500).send(err);
                        })
                    })
                }, function(err) {
                    res.status(500).send(err);
                });
    });

module.exports = router;