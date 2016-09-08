var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(session({ 
    secret: 'juice juice',
    saveUninitialized: false,
    resave: true,
  }));
  app.use(function(req, res, next) {
    console.log(req.session, '<--------- Session');
    next();
  });
  app.use(express.static(__dirname + '/../../public'));
};


// app.use(funtion(req, res, next) {
  // console.log(req.session)
//})
