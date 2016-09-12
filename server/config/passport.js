var keys = require('../../keys.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


/****** REQUIRE DATABASE ******/
var db = require('../db/config.js');
var User = require('../db/user.schema.js');
/****************** PASSPORT CONFIG ***************/

passport.use(new FacebookStrategy({
  clientID: keys.facebook.FACEBOOK_APP_ID,
  clientSecret: keys.facebook.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id', 'name', 'picture.type(large)', 'email', 'gender']
},
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreateUser(profile, function(error, user) {
      if (error) {
        return done(error);
      } else {
        done(null, {
          _facebookUniqueID: user._facebookUniqueID,
          firstname: user.firstname,
          lastname: user.lastname,
          picture: user.picture
        });
      }
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
