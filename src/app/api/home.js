var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Alumnos = mongoose.model('Alumnos');

module.exports = function (app) {
  app.use('/', router);
};


//GET - ALUMNOS
router.get('/alumnos', function(req, res, next){
  Alumnos.find(function(err, alumnos){
    if(err) return next(err);

    res.json(alumnos)
  })
})


//POST - AGREGAR ALUMNO
router.post('/alumno', function(req, res, next){
  var alumno = new Alumnos(req.body);

  alumno.save(function(error, alumno){
    if(error) return next(error)
    res.json(alumno);
  })
})




//PUT - ACTUALIZAR ALUMNO
router.put('/alumno/:id', function(req, res){
  Alumnos.findById(req.params.id, function(error, alumno){
    alumno.nombre = req.body.nombre;
    alumno.email = req.body.email;
    alumno.edad = req.body.edad;

    alumno.save(function(error){
      if(error) res.send(error)
      res.json(alumno);
    })
  })
})

//DELETE - BORRO ALUMNO
router.delete('/alumno/:id', function(req, res){
  Alumnos.findByIdAndRemove(req.params.id, function(error){
    if(error) res.send(error);
    res.json({message: 'El alumno se ha eliminado'});
  })
})