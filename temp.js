// //连接数据库
// var mysql = require('mysql2');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'limin',
//     password: '123456',
//     database: 'zizhu'
// });

// connection.connect();
// //查询
// connection.query('select name,password from managerUser where name= ?', 'zizhu', function(err, rows, fields) {
//     if (err) throw err;
//     console.log('The solution is: ', rows[0]);
// });
// //关闭连接
// connection.end();

// --------------------------------------
var a = 1;

function func() {
    (function() {
        var b = 100;
        a = b;
    })()
    return a;
}
console.log(func()) //为什么结果为1，要如何获取b的值


function counter(initialValue) {
    var privateValue = initialValue;

    function changeBy(delta) {
        privateValue += delta;
    }

    return {
        increament: function() {
            changeBy(1);
        },
        decreament: function() {
            changeBy(-1);
        },
        getValue: function() {
            return privateValue;
        }
    }
}

var counter1 = counter(5);
var counter2 = counter(5);

counter1.increament();
counter1.increament();
console.log(counter1.getValue()); // 7  

counter1.decreament();
console.log(counter1.getValue()); // 6  

console.log(counter2.getValue()); // 5