var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var usuario = require('./routes/usuario');
var index = require('./routes/index');
var termo = require('./routes/termo');
var categoria = require('./routes/categoria');

var app = express();

var connection = require('./database-connection');
global.db = connection;

app.use(logger('dev'));
app.use(cookieParser());

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'dicionario',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: new Date(Date.now() + (60 * 1000 * 15)) }
            }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8080);

app.use('/usuario', usuario);
app.use('/', index);
app.use('/termo', termo);
app.use('/categoria', categoria);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  res.status(err.status || 500);
  res.render('page-500');
});

module.exports = app;
app.listen(8080)
