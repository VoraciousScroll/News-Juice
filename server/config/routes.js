module.exports = function(app, express) {

  // These take the AJAX requests from the client and call the matching function in the second parameter.
  app.get('/home', searchController.handleHomeGet);
  app.post('/home', searchController.handleHomePost);

  // Error handling: send log the error and send status 500. This handles one error.
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

};