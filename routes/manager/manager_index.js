var express = require('express');
var router = express.Router();

router
    .get('/', function(req, res, next) {
        res.render('manager/manager_index', {
            title: 'manager_index',
            user: req.session.user
        });
    });

module.exports = router;