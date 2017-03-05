var express = require('express');
var router = express.Router();
router
    .get('/', function(req, res, next) {
        res.render('educationSchool', {
            title: 'educationschool'
        });
    });
module.exports = router;