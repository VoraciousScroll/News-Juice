var app = require('../server.js');
var routes = require('express').Router();
var passport = require('./passport.js');

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



  /************* AYLIEN API ROUTES ********************/


  // These take the AJAX requests from the client and call the matching function in the second parameter.

  // app.get('/', function(req, res) {
  //   console.log('Get received on server.js from "/".');
  //   res.send('Get received on server.js from "/".');
  // })

  callAylienAPI = function(terms, res) {
    var AylienNewsApi = require('aylien-news-api');
    var apiInstance = new AylienNewsApi.DefaultApi();

    // Configure API key authorization: app_id
    var app_id = apiInstance.apiClient.authentications['app_id'];
    app_id.apiKey = "f30791a4";

    // Configure API key authorization: app_key
    var app_key = apiInstance.apiClient.authentications['app_key'];
    app_key.apiKey = "da0d3014450a578285e457a39e5f641a";
    var opts = {
      'title': terms,
      'sortBy': 'social_shares_count.facebook',
      'language': ['en'],
      'publishedAtStart': 'NOW-7DAYS',
      'publishedAtEnd': 'NOW',  
      // 'entitiesBodyLinksDbpedia': [
      //   'http://dbpedia.org/resource/Donald_Trump',
      //   'http://dbpedia.org/resource/Hillary_Rodham_Clinton'
      // ]
    };
    var callback = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully. Returned data: ' + data);
        res.send(data);
      }
    };
    apiInstance.listStories(opts, callback);
  };


  app.get('/alpha', function(req, res) {
    console.log('Get received on server.js from "/alpha".');
    res.send('Get received on server.js from "/alpha".');
  });

  app.route('/search')
    .get(function(req, res) {
      console.log('Received get on /search from app.route on routes.js');
      // res.send('Received get on /search from app.route on routes.js');
      callAylienAPI('cats', res);
    });

  app.route('/results/:input')
    .get(function(req, res) {
      console.log('Received get on /results/:input from app.route on routes.js');
      // res.send('Received get on /search from app.route on routes.js');
      callAylienAPI('cats', res);
    });

  app.route('/:input')
    .get(function(req, res) {
      console.log('Received get on /:input from app.route on routes.js. req:', req.params.input, req.params);
      callAylienAPI(req.params.input, res);
    });

  // app.get('/home', searchController.handleHomeGet);
  // app.post('/home', searchController.handleHomePost);




  // Error handling: send log the error and send status 500. This handles one error.
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

};
