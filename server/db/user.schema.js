var mongoose = require('mongoose');

var fbProfile = function (fbProfile) {
  return {
    _facebookUniqueID: fbProfile.id,
    firstname: fbProfile.name.givenName,
    lastname: fbProfile.name.familyName,
    picture: fbProfile.photos[0].value,
    gender: fbProfile.gender
  };
};

var userSchema = new mongoose.Schema({
  _facebookUniqueID: String,
  firstname: String,
  lastname: String,
  picture: String,
  gender: String,
  articles: Array
});

var User = mongoose.model('User', userSchema);

User.findOrCreateUser = function(profile, callback) {
  User.findOne({_facebookUniqueID: profile.id}, function (error, user) {
    if (error) {
      console.log('ERROR: ', error);
      callback(error);
    } else if (!user) {
      User.create(fbProfile(profile), function(error, user) {
        if (error) {
          console.log('ERROR: ', error);
          callback(error);
        } else {
          console.log('Success added new user: ', user);
          callback(null, user);
        }
      });
    } else {
      callback(null, user);
    } 
  });
};



module.exports = User;
