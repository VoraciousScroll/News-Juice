var express = require('express');
var app = express();
app.use(express.static('public'));
require('./config/middleware.js')(app, express);

app.listen(3000, function() {
  console.log('SmartNews server listening on port 3000.');
});

module.exports = app;
