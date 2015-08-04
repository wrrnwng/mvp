var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/sardineCan');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

// database stuff
var Trip = mongoose.model('Trip', {
  beginStn: String,
  endStn: String
});

var Station = mongoose.model('Station', {
  name: String,
  abbr: String
});

// routes
app.get('/api/trips', function(req, res) {
  Trip.find(function(err, trips) {
    if (err) {
      res.send(err);
    }
    res.json(trips);
  });
});

app.post('/api/trips', function(req, res) {
  Trip.create({
    beginStn: req.body.beginStn,
    endStn: req.body.endStn
  }, function(err, trip) {
    if (err) {
      res.send(err);
    }
    Trip.find(function(err, trips) {
      if (err) {
        res.send(err);
      }
      res.json(trips);
    });
  });
});

app.delete('/api/trips/:trip_id', function(req, res) {
  Trip.remove({
    _id: req.params.trip_id
  }, function(err, trip) {
    if (err) {
      res.send(err);
    }
    Trip.find(function(err, trips) {
      if (err) {
        res.send(err);
      }
      res.json(trips);
    });
  });
});

app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});