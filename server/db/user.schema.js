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

var getUserObj = function(req) {
  // var obj = req.headers['x-xsrf-token'].slice(2);
  // console.log(JSON.parse(obj).user, 'here')
  return JSON.parse(req.headers['x-xsrf-token'].slice(2)).user;
};

var userSchema = new mongoose.Schema({
  _facebookUniqueID: String,
  firstname: String,
  lastname: String,
  picture: String,
  gender: String,
  articles: [{
    title: String,
    author: String,
    publishDate: Date,
    articleLink: String,
    articleSource: String,
    img: String,
    body: String
  }]
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
          callback(error);
        } else {
          callback(null, user);
        }
      });
    } else {
      callback(null, user);
    } 
  });
};

User.saveArticle = function(req, callback) {
  var profile = getUserObj(req);
  console.log(req.body, 'body');
  User.findOneAndUpdate({_facebookUniqueID: profile._facebookUniqueID}, {$push: {articles: req.body}}, {safe: true, upsert: true},
    function(error, article) {
      if (error) {
        console.log('Failure to save article', error);
        callback(error);
      } else {
        console.log('Saved article', article);
        callback(null, article);
      }
    });
};


module.exports = User;
