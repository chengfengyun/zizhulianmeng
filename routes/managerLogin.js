var express = require('express');
var router = express.Router();
var crypto = require('crypto'),
    db = require('../models/db.js');

router
    .get('/', function(req, res, next) {
        res.render('managerLogin', {
            title: 'managerLogin',
            error: req.flash('error').toString(),
            success: req.flash('success').toString()
        });
    })
    .post('/', function(req, res) {
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        db.read(req.body.name, function(err, rows) {
            user = rows[0];
            if (user) {
                if (user.password != req.body.password) {
                    req.flash('error', '密码错误！');
                    return res.redirect('/managerLogin');
                }
                req.session.user = user.name;
                req.flash('success', '登录成功')
                res.redirect('/manager/manager_index'); //登录成功后跳转到主页
            } else {
                req.flash('error', '用户不存在');
                res.redirect('/managerLogin');
            }
        });
    });

module.exports = router;