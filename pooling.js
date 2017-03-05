// var mysql = require('mysql2');
// var pool = mysql.createConnection({
//     host: 'localhost',
//     user: 'limin',
//     password: '123456',
//     database: 'test',
//     port: 3306
// });

var mysql = require('mysql2');
var conn;

function handleError() {
    conn = mysql.createConnection({
        host: 'localhost',
        user: 'limin',
        password: '123456',
        database: 'test',
        port: 3306
    });

    //连接错误，2秒重试
    conn.connect(function(err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleError, 2000);
        }
    });

    conn.on('error', function(err) {
        console.log('db error', err);
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleError();
        } else {
            throw err;
        }
    });
}
handleError();