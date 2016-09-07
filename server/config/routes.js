var app = require('../server.js');
var routes = require('express').Router();
// var searchController = require('../search/searchController');

module.exports = function(app, express) {

  // These take the AJAX requests from the client and call the matching function in the second parameter.

  // app.get('/', function(req, res) {
  //   console.log('Get received on server.js from "/".');
  //   res.send('Get received on server.js from "/".');
  // })
  
  app.use('/', express.static('public'));

  app.get('/alpha', function(req, res) {
    console.log('Get received on server.js from "/alpha".');
    res.send('Get received on server.js from "/alpha".');
  })
  
  app.route('/beta')
  .get(function(req, res) {
    console.log('Received get on /beta from app.route on routes.js');
    res.send('Received get on /beta from app.route on routes.js');
  })
  
  app.route('/:gamma')
  .get(function(req, res) {
    console.log('Received get on /:gamma from app.route on routes.js');
    res.send('Received get on /:gamma from app.route on routes.js');
  })

  // app.get('/home', searchController.handleHomeGet);
  // app.post('/home', searchController.handleHomePost);

  // Error handling: send log the error and send status 500. This handles one error.
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

};