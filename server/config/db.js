var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/voraciousscroll');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _facebookUniqueID: String,
  firstname: String,
  lastname: String,
  picture: String,
  gender: String
});

var User = mongoose.model('User', userSchema);

User.findOrCreateUser = function(profile, callback) {
  console.log(profile, 'THESE ARE YOUR PROFILE OPTIONS');
  User.findOne({_facebookUniqueID: profile.id}, function (error, result) {
    console.log(result, 'THIS IS MY RESULT FROM THE DB');
    if (!result) {
      User.create({  
        _facebookUniqueID: profile.id,
        firstname: profile.first_name,
        lastname: profile.last_name,
        picture: profile.picture,
        gender: String
      }, function (error, user) {

      });
    } else {
      callback (error, result);
    }
  });
};


exports.User = User;

// 'id', 'name', 'picture.type(large)', 'email'