var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/voraciousscroll');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String
});

var User = mongoose.model('User', userSchema);

exports.User = User;