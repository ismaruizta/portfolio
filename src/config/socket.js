var io = require('socket.io');
var config = require('./config');

//VARIABLES CENTRAL




//LOGICA SOCKET
exports.startIo = function startIo(server){
io = io.listen(server);
var central = io.of('/central');

central.on('connection', conexion);

return io;
};

//FUNCIONES SOCKET
var conexion = function(socket){

  //NUEVO USUARIO
  usuarios.push(socket);
  console.log("Nueva conexión, usuarios conectados: "+usuarios.length);
  infoNuevoUsuario = {
    id: socket.id,
    color: colores[usuarios.length]
  }
  io.emit('usuario_nuevo', infoNuevoUsuario);


  partida.usuariosConectados ++;
  partida.usuarios.push(socket);




  //RECIBO UNA PULSACION
  socket.on('correcto', function(info_escritura_usuario){
    io.emit('correcto', info_escritura_usuario);
  });


  //RECIBO UNA DESCONEXION
  socket.on('disconnect', function() {
    var i = usuarios.indexOf(socket);
    usuarios.splice(i, 1);
    console.log('Desconexión, quedan '+usuarios.length+' usuarios');
  });

}