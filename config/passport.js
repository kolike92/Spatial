var auth = require('./passport');
var spatialUser = require('./models/user.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
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

};
