var express = require('express');
var router = express.Router();

var mongoose    = require('mongoose');

var UserSchema = require('../models/user')

/* POST */
router.post('/', function(req, res, next) {
    SpatialUser = new UserSchema(
      req.body
    );
    SpatialUser.save(function(err) {
            if (err) {res.send(err);}
            else {res.send ({message: 'New user created.'})}
    })
});

/* GET */
router.get('/', function(req, res, next) {
    UserSchema.find({}, function(err, results) {
        res.json(results);
    })
});

module.exports = router;
