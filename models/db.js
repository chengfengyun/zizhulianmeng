var mysql = require('mysql2');
var settings = require('../settings.js');

module.exports.read = function(name, callbackfn) {
    var connection = mysql.createConnection(settings.db);
    connection.connect();
    connection.query('select name,password from managerUser where name= ?', name, function(err, rows, fields) {
        if (err) {
            connection.end();
            callbackfn(err, null);
        } else {
            connection.end();
            callbackfn(null, rows);
        }
    });
}

// function User() {}
// module.exports = User;
// module.exports = 'User';

// //存储管理员用户信息
// User.prototype.ins = function(callbackfn) {
//     var user = {
//         name: this.name,
//         password: this.password
//     }
//     var connection = mysql.createConnection(settings.db);
//     connection.connect();
//     //建立数据库
//     // client.query('CREATE DATABASE managerUser', function(err) {
//     //     if (err && err.number != Client.ERROR_DB_CREATE_EXISTS) {
//     //         throw err;
//     //     }
//     // })
//     connection.query('insert into managerUser SET ?', { name: user.name, password: user.password }, function(err, result) {
//         if (err) {
//             connection.end();
//             return callback(err);
//         }
//         callbackfn(null, user);
//         connection.end();
//         console.log(result);

//     })