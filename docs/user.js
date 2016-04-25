var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// var bcrypt = require('bcrypt-nodejs');  for encrypting the password

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
