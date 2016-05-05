var express     = require('express');
var path        = require('path');
var mongoose    = require('mongoose');
var port        = process.env.PORT || 3000;
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var cookieParser= require('cookie-parser');
var passport    = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session     = require('express-session');
var spatialUser = require('./models/user.js');

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
app.use(express.session({secrect: 'secret'}));
app.use(passport.initialize()); //startup up passport
app.use(passport.session()); //startup session

//for sessions but we are only doing log in and not a session (since we are not doing other requests)
passport.serializeUser(function(user,done) {
    done(null,user.id);
});

passport.deserializeUser(function(id,done) {
    spatial-user.findById(id, function(err, user) {
        done(err, user);
    });
});



//CONFIGURE PASSPORT LOCAL STRATEGY
passport.use('local-login', new LocalStrategy(
    function(username, password, done) {
        spatial-user.findOne({'username': username}, function(err,user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false);
            }
            if (!user.validPassword(password)) { //or you can do  user.password != password
                return done(null, false);
            }
            
            return done(null, user);
        });
    }));

//CONFIGURE PASSPORT SIGNUP STRATEGY
passport.use('local-signup', new LocalStrategy(
    function(username, password, done) {
        process.nextTick(function() {
            spatial-user.findOne({ 'username' : username }, function(err,user) { //checking to see if the username already exists
                if (err) //if there are any errors then return error
                    return done(err);
                if (user) { //check if user already exists
                    return done(null, false);
                } else {
                    //create new user
                    var newUser = new spatial-user();
                    
                    //set user credentials
                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);
                    
                    //save new user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

app.use('/login', login);
app.use('/signup', signup);

//PASSPORT.JS ROUTES
app.get('/login', function(req,res) {
    res.render('login');
});

app.get('/signup', function(res,req) {
    res.render('signup');
});

app.get('/logout', function(req,res) {
    req.logout();
    res.redirect('/index');
});

//post to process login form
app.post('/login', passport.authenticate('local-login', {successRedirect: '/index', failureRedirect: '/login'}));

//post to process signup form
app.post('/signup', passport.authenticate('local-signup', {successRedirect : '/index', failureRedirect : '/signup'}));

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
