var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var i18n = require("i18n-express");
//VARIABLES PARA EL LOGIN CON TOKEN
var cors = require('cors');

var middleware = require('../app/api/middleware/middleware');  


module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
  app.use(favicon(config.root + '/public/assets/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cors()); //para el login
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());


  //CARGA DE LOS API SCRIPTS
  var controllers = glob.sync(config.root + '/app/**/api/*.js');
  controllers.forEach(function (api) {
    require(api)(app);
  });


  //CARGA DE LOS JADE
  var views = glob.sync(config.root + '/app/');
  views.forEach(function(view){
    app.set('views', view);
    app.set('view engine', 'jade');
  })




  //ERROR NO ENCONTRADO
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    res.status(err.status || 404);
    res.render('error', {
      message: err.message,
      error: err,
      title: 'error'
    });
  });
  

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

  return app;
};
