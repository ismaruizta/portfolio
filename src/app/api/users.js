var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var middleware = require('./middleware/middleware');
var User = mongoose.model('User');  
var service = require('./auth/service');

module.exports = function (app) {
  app.use('/', router);
};


//SIGNUP - REGISTRO
router.post('/auth/signup', function(req, res, next) {  
    var user = new User(req.body);

    user.save(function(err, user){
        if(err) return next(err)
        if(user){
            return res
            .status(200)
            .send({token: service.createToken(user)});
        }else{
            return res
            .status(200)
            .send({error: "userNotFound"});
        }
    });
});  


router.get('/pepe/pi', function(){
	console.log("Hola");
})


//LOGIN
router.post('/auth/login', function(req, res, next) {  
    User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
        //COMPROBAR SI ES CORRECTA LA CONTRASEÑA FALTA
        if(err) return next(err);
        if(user){
            return res
            .status(200)
            .send({token: service.createToken(user)});
        }else{
            return res
            .status(200)
            .send({error: "userNotFound"});
        }
        
    });
});


//RUTA PRIVADA
router.get('/private',middleware.ensureAuthenticated, function(req, res) {

} );


