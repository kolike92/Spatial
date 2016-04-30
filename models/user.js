var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');  //to encrypt password

// User Schema = define structure of the data inside a collection
var UserSchema = new Schema({
    username: String,
    password: String
}, {
    collection: 'spatial-user'
});


//HASHING THE PASSWORD WITHIN OUR USER MODEL BEFORE IT IS SAVED TO DB
//generate hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
});

//check that password is valid
UserSchema.method.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
});


module.exports = mongoose.model('spatial-user', UserSchema);


/*var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// User Schema
var UserSchema = new Schema({
    username: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Timestamp
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

module.exports = mongoose.model('spatial-user', UserSchema);
*/
