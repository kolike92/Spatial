// include dependencies
var express         = require('express');
var path            = require('path');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3000;
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');

var app = express();
var router      = express.Router();

// views & view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// mongodb with mongoose
mongoose.connect("mongodb://localhost/SpatialApp");

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/public')));
app.use('/bower_components',  express.static(path.join(__dirname + '/bower_components')));

// routes
app.use('/', require('./routes/index'));
app.use('/list', require('./routes/list'));
app.use('/events', require('./routes/events'));
app.use('/geoloc', require('./routes/geoloc'));
app.use('/users', require('./routes/users'));

// 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler (w/ stacktrace)
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler (w/o stacktrace)
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
// started by server: bin/server.js
