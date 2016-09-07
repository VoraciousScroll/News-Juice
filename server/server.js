var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
// var db = require('./config/db.js');
var routes = require('./config/routes.js')
routes(app, express);
// require('./config/middleware.js')(app, express);

module.exports = app;
