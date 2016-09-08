var app = require('../server.js');
var routes = require('express').Router();
var passport = require('./passport.js');
var aylien = require('../news-apis/aylien-helpers.js');

module.exports = function(app, express) {

/**************** USER AUTH FACEBOOK *****************/
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/facebook',
    passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
      function(req, res) {
      // Successful authentication, redirect home.
        console.log(req.session, 'REQUEST SESSION');
        console.log(req.session.passport, 'REQUEST PASSPORT session');
        res.cookie('authenticate', req.session.passport);
        res.redirect('/');
      });

  app.route('/results/:input')
    .get(function(req, res) {
      console.log('Received get on /results/:input from app.route on routes.js');
      aylien.timelineData(req.params.input, res);
    });


  // Error handling: send log the error and send status 500. This handles one error.
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

};
