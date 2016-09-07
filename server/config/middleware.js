var morgan = require('morgan');
var bodyParser = require('body-parser');
var sessions = require('express-session');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../public'));



  
};

/************ SET UP SESSIONS AND PASSPORT *****************/