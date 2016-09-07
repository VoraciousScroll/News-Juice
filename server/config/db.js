var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/voraciousscroll');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: String,
  lastname: String,
  _facebookUniqueID: String
});

userSchema.statics.findOrCreate = function(profile, callback) {
  var userObj = new this();
  this.findOne({_facebookUniqueID: profile.id}, function (error, result) {
    if (!result) {
      userObj.firstname = profile.name.givenName;
      userObj.lastname = profile.name.familyName;
      userObj.facebookUniqueID = profile.id;
    } else {
      callback (error, result);
    }
  });
};

var User = mongoose.model('User', userSchema);

exports.User = User;