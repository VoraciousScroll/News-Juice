var app = require('../server.js');
var routes = require('express').Router();
var passport = require('./passport.js');
var aylien = require('../news-apis/aylien-helpers.js');
var googleTrends = require('../news-apis/google-trends-helpers.js');
var request = require('request');
var db = require('./db.controller.js');

module.exports = function(app, express) {

/**************** AUTOCOMPLETE *****************/
  app.route('/input/:input')
    .get(function(req, res) {
      var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=prefixsearch&prop=pageprops%7Cpageimages%7Cpageterms&redirects=&ppprop=displaytitle&piprop=thumbnail&pithumbsize=80&pilimit=5&wbptterms=description&gpssearch=' + req.params.input + '&gpsnamespace=0&gpslimit=5';
      request(url, function(err, resp, body) {
        if (err) {
          console.log('there was an error requesting via express', err);
        } else {
          console.log('<<<<<<<<<<- congrats!!!');
          res.status(200).send(body);
        }
      });
    });

/**************** USER AUTH FACEBOOK *****************/
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/facebook',
    passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
      function(req, res) {
      // Successful authentication, redirect home.
        res.cookie('authenticate', req.session.passport);
        res.redirect('/');
      });

  app.route('/results/:input')
    .get(function(req, res) {
      console.log('Received get on /results/:input from app.route on routes.js');
      aylien.timelineData(req.params.input, res);
    });


  // http://localhost/3000/see-article?input=obama&start=[startdate]&end=[enddate]
  app.route('/seearticle')
    .get(function(req, res) {
      aylien.articleImport(req.query.input, res, req.query.start, req.query.end, req.query.limit);
    });

  /************************ GOOGLE TRENDS **********************************/
  // Top trends pull top # of trends from specified country
    // googleTrends.hotTrends(resultLimit, country, res)
      // resultLimit: Number
      // country: String, ex: 'US', default is US

  app.route('/api/news/topTrends')
    .get(function(req, res) {
      googleTrends.hotTrends(res, 10, 'US');
    });

  app.route('/api/news/topTrendsDetail')
    .get(function(req, res) {
      googleTrends.hotTrendsDetail(res, 10, 'US');
    });

  /************************ SAVE ARTICLE **********************************/
  app.route('/saveArticle')
    .post(function(req, res) {
      db.saveArticle.post(req, function(error, success) {
        if (error) {
          res.sendStatus(501);
        } else {
          res.send({article: success});
        }
      });
    });
    

  // Error handling: send log the error and send status 500. This handles one error.
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

};
