var express = require('express');
var procedures = require('../procedures/products.proc');

var router = express.Router();
router.route('/') // collection /api/products
    .get(function(req, res) {
        procedures.all()
            .then(function(success) {
                res.send(success);
                }, function(err) {
                    res.status(500).send(err);
                });
    });

router.route('/:id') //collection /api/products/id
    .get(function(req, res) {
        procedures.read(req.params.id)
            .then(function(product) {
                res.send(product);
            }, function(err) {
                res.status(500).send(err);
            });
    });

module.exports = router;