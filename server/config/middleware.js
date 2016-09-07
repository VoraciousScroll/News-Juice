var keys = require('../../keys.js');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var db = require('./db');

module.exports = function(app, express) {
  passport.use(new FacebookStrategy({
    clientID: keys.facebook.FACEBOOK_APP_ID,
    clientSecret: keys.facebook.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/login/facebook/callback'
  }),
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(profile, function (error, user) {
      if (error) {
        return done(error);
      } else {
        done(null, user);
      }
    });
  }
 );
};

/********************** NOTES **************************/

/*
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: 'Invalid username or password.' }));
- Login in valid to / not valid to login


{ failureFlash: 'Invalid username or password.' });

*/