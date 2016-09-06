var app = require('../server.js');
var keys = require('../../keys.js');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = {
  passport: function() {
    passport.use(new FacebookStrategy({
      clientID: keys.facebook.FACEBOOK_APP_ID,
      clientSecret: keys.facebook.FACEBOOK_APP_SECRET,
      callbackURL: 'http://www.example.com/auth/facebook/callback'
    })
   );
  },
};


  // facebook: {
  //   FACEBOOK_APP_ID: 237844133279066,
  //   FACEBOOK_APP_SECRET: 'fdccb8d1e3e64f1e16ae793d05470607'
  // }

/********************** NOTES **************************/

/*
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: 'Invalid username or password.' }));
- Login in valid to / not valid to login


{ failureFlash: 'Invalid username or password.' });

*/