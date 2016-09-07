var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/voraciousscroll');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _facebookUniqueID: String,
  firstname: String,
  lastname: String,
  picture: String,
  email: String,
  gender: String
});

var User = mongoose.model('User', userSchema);

User.findOrCreateUser = function(profile, callback) {
  User.findOne({_facebookUniqueID: profile.id}, function (error, result) {
    // if (!result) {
    //   userObj.facebookUniqueID = profile.id;
    //   userObj.firstname = profile.name.givenName;
    //   userObj.lastname = profile.name.familyName;
    //   userObj.picture = profile.picture.type(large);
    //   userObj.email = profile.name.familyName;
    // } else {
    //   callback (error, result);
    // }
  });
};


exports.User = User;

// 'id', 'name', 'picture.type(large)', 'email'