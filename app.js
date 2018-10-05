let createError = require('http-errors');
let express = require('express');
let expressValidator = require('express-validator');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


let mongoose = require('mongoose');
let passport = require('passport');
let session = require('express-session');


require('./passport');
let config = require('./config');


let indexRouter = require('./routes/index');
let aboutRouter = require('./routes/about');
let contactRouter = require('./routes/contact');
let authRouter = require('./routes/auth');
let taskRouter = require('./routes/task');

mongoose.connect(config.dbConnectionString, {
    useCreateIndex: true,
    useNewUrlParser: true
});

global.User = require('./models/user');
global.Task = require('./models/task');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: config.sessionKey,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator());

app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
});

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', taskRouter);

app.use('/about', aboutRouter);
app.use('/contact', contactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
