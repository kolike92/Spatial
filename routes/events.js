var express     = require('express');
var router      = express.Router();
var request     = require('request');

// config
var config = require('../.config.json');

var mongoose    = require('mongoose');

var EventSchema = require('../models/event')

/* API Call */
function getEvents(location, radius, key) {
    var queryString= 'http://api.eventful.com/json/events/search?...&l='+ location + '&within' + radius + '&app_key=' + key
    request(queryString, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parsedEvents = JSON.parse(body).events.event;
            parsedEvents.forEach(function(event) {
                SpatialEvent = new EventSchema();
                SpatialEvent.title          = event.title;
                SpatialEvent.description    = event.description;
                SpatialEvent.address        = event.venue_address;
                SpatialEvent.venue          = event.venue_name;
                SpatialEvent.city           = event.city_name;
                SpatialEvent.region         = event.region_name;
                SpatialEvent.rc             = event.region_abbr;
                SpatialEvent.country        = event.country_name;
                SpatialEvent.cc             = event.country_abbr;
                SpatialEvent.postal         = event.postal_code;
                SpatialEvent.latitude       = event.latitude;
                SpatialEvent.longitude      = event.longitude;
                SpatialEvent.start          = event.start_time;
                SpatialEvent.stop           = event.stop_time;
                SpatialEvent.created        = event.created;
                SpatialEvent.timezone       = event.olson_path;
                SpatialEvent.url            = event.venue_url;
                SpatialEvent.save(function(err) {
                    if (err) {res.send(err); console.log(err);}
                    // else {res.send ({message: 'New events received.'})}
                    else console.log("New event processed.");
                })
            });
        }
    });
}

router.post('/events', function(req, res, next) {
    getEvents("Boston","100",config.api.eventful_key);
});

/* GET event listing */
router.get('/events', function(req, res, next) {
    EventSchema.find({}, function(err, results) {
        res.json(results);
    })
});

module.exports = router;
