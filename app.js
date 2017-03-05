var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express3-handlebars');
var flash = require('connect-flash');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var app = express();

// view engine setup

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'layout',
    defaulttDir: 'views',
    helpers: {
        section: function(name, options) {
            if (!this._sections) {
                this._sections = {};
            }
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}));
app.set("view engine", 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

var options = require('./settings.js').db;
var sessionStore = new MySQLStore(options);
app.use(session({
    key: 'session_cookie_name',
    cookie: { maxAge: 1200 }, //20min
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

var index = require('./routes/index');
var centerProfile = require('./routes/centerProfile');
var educationSchool = require('./routes/educationSchool');
var friendshipLink = require('./routes/friendshipLink');
var fundingNews = require('./routes/fundingNews');
var messageBoard = require('./routes/messageBoard');
var notice = require('./routes/notice');
var managerLogin = require('./routes/managerLogin');

var manager_index = require('./routes/manager/manager_index');

//user interface
app.use('/', index);
app.use('/centerProfile', centerProfile);
app.use('/educationSchool', educationSchool);
app.use('/friendshipLink', friendshipLink);
app.use('/fundingNews', fundingNews);
app.use('/messageBoard', messageBoard);
app.use('/notice', notice);
app.use('/managerLogin', managerLogin);

//manager interface
app.use('/manager/manager_index', manager_index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000);
console.log('listening on 3000')
module.exports = app;