var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

module.exports = app;