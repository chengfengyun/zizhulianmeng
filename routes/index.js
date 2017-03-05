var express = require('express');
var router = express.Router();
var settings = require('../settings.js');

// var session = require('express-session');
// var MySQLStore = require('express-mysql-session')(session);
var mysql = require('mysql2');

router.get('/', function(req, res, next) {

    // res.render('index', { title: 'index' });

    var str = 'SELECT date from notice';
    var conn = mysql.createConnection(settings.db);
    // var sessionStore = new MySQLStore({} /* session store options */ , conn);

    conn.connect();
    conn.query(str, function(err, rows, fields) {
        if (err) {
            req.flash('error', '数据查询有误');
        }
        if (!err) {
            res.render('index', {
                title: 'express',
                message: rows[0].date,
                error: req.flash('error').toString()
            });
        }
    });
    conn.end();
});

module.exports = router;