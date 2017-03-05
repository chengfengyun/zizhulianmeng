var express = require('express');
var router = express.Router();
router
    .get('/', function(req, res, next) {
        res.render('messageBoard', {
            title: 'messageboard'
        });
    });
module.exports = router;