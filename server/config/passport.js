var keys = require('../../keys.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


/****** REQUIRE DATABASE ******/
var db = require('./db');

/****************** PASSPORT CONFIG ***************/

passport.use(new FacebookStrategy({
  clientID: keys.facebook.FACEBOOK_APP_ID,
  clientSecret: keys.facebook.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id', 'name', 'picture.type(large)', 'email', 'gender']
},
  function(accessToken, refreshToken, profile, done) {
    db.User.findOrCreateUser(profile, function(error, user) {
      if (error) {
        return done(error);
      } else {
        done(null, user);
      }
    });
  })
);



module.exports = passport;


/********************** NOTES **************************/

/*
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: 'Invalid username or password.' }));
- Login in valid to / not valid to login


{ failureFlash: 'Invalid username or password.' });

*/