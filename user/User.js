var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  infusionId: String,
  titanId: String
});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');
