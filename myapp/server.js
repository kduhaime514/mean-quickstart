var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Factory = require("./module.factory.js");

// DATABASE
mongoose.connect('mongodb://localhost/mydatabase');
var db = mongoose.connection;
db.on('error', function callback () {console.log("Connection error");});
db.once('open', function callback () {console.log("Mongo working!");});

var factory = new Factory(Schema, mongoose);
factory.createSchemas();
factory.insertPeople();

// ENDPOINTS
app.get('/ping', function(req, res) {
    res.send({ping:'hello this is server and I am alive!'});
});

app.get('/ping/:id', function(req, res) {
    res.send({ping:'hello this is server and I am got '+req.params.id});
});

app.get('/person/hektor', function(req, res) {
     var resp = factory.getPerson({name:'hektor'},res);
});

// UI
app.get('/', function(req, res) {
    res.render('index', {title: 'Home'});
});

// PORT
app.listen(3000);
console.log('Listening on port 3000...');
