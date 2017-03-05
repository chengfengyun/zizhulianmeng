var express = require('express');
var router = express.Router();
var settings = require('../settings.js');
var moment = require('moment');

// var session = require('express-session');
// var MySQLStore = require('express-mysql-session')(session);
var mysql = require('mysql2');

router.get('/', function(req, res, next) {

    var str = 'SELECT * FROM notice AS result';
    var conn = mysql.createConnection(settings.db);
    // var sessionStore = new MySQLStore({} /* session store options */ , conn);

    conn.connect();
    conn.query(str, function(err, rows, fields) {
        // console.log(rows);
        if (err) {
            req.flash('error', '数据查询有误');
        }
        if (!err) {
            // console.log(rows);
            // console.log(rows.toString()[0]); //JSON.stringify(rows)
            // for(var i=0; i<rows.length)


            // function array_count(obj) {
            //     var n = 0;
            //     for (var i in obj) {
            //         n++;
            //     }
            //     return n;
            // }
            for (var i = 0, num = rows.length; i < num; i++) {
                rows[i].date = moment(rows[i].date).format('YYYY-MM-DD');
            }
            console.log(rows.length);
            res.render('notice', {
                title: 'notice',
                // message: JSON.stringify(rows),
                // mes: JSON.stringify(rows),
                mes: rows,
                // date: moment(rows[0].date).format('YYYY-MM-DD'),
                error: req.flash('error').toString()
            });

        }
    });
    conn.end();
});

module.exports = router;