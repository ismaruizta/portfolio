var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String
});

/*AlumnoSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
});
*/
mongoose.model('User', UserSchema);

