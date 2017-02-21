var express = require('express');
var config = require('./src/config/config');
var glob = require('glob');
var mongoose = require('mongoose');
var io = require('./src/config/socket');

//CONEXION BASE DATOS
//mongoose.connect(config.db);
mongoose.connect('mongodb://localhost/meca');
var db = mongoose.connection;

db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
  console.log("error al conectar");
});


//INCLUYENDO LOS MODELS
var models = glob.sync(config.root + 'src/app/models/*.js');
models.forEach(function (model) {
  require(model);
});



var app = express();

module.exports = require('.src/config/express')(app, config);

var server = app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

io.startIo(server);


 