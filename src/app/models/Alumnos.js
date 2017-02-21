var mongoose = require('mongoose');

var AlumnosSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  edad: Number
});

/*AlumnoSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
});
*/
mongoose.model('Alumnos', AlumnosSchema);

