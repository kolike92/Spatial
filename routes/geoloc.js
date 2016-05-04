var express     = require('express');
var router      = express.Router();
var request     = require('request');

var config      = require('../.config.json');
var mongoose    = require('mongoose');

function sendGeoloc(res, key) {
    var queryString= 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + key;
    request({
        url: queryString,
        method: 'POST',
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            res.json(JSON.parse(body).location);
        }
    });
}

router.post('/', function(req, res, next) {
    sendGeoloc(res, config.api.geolocation_key);
});

module.exports = router;
