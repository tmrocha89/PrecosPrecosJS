var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');     //added
var passport = require('passport');           //added
var mongoose = require('mongoose');


var routes = require('./routes/index');
//var users = require('./routes/users');
require('./models/divisao');
var divisoes = require('./routes/divisaoApi');
require('./models/loja');
var lojas = require('./routes/lojaApi');
require('./models/imagem');
var imagens = require('./routes/imagemApi');
require('./models/preco');
var precos = require('./routes/precoApi');
require('./models/produto');
var produtos = require('./routes/produtoApi');

require('./models/user');
var authenticate = require('./routes/authenticate')(passport);

mongoose.connect(process.env.MONGO_DB_CONNECT_STR);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session({secret:'this is my super secret'}));           //added
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());                               //added
app.use(passport.session());                                  //added



app.use('/', routes);
app.use('/auth', authenticate);
app.use('/api/divisoes',divisoes);
app.use('/api/lojas',lojas);
app.use('/api/imagens',imagens);
app.use('/api/precos',precos);
app.use('/api', produtos);
//app.use('/users', users);

// inicializar o passport
var initPassport = require('./passport-init');
initPassport(passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
