var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { auth } = require('express-openid-connect');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/mymedia');

var app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '08b9814aab38122da282b93fb411aa76',
  baseURL: 'https://foragers-scrapbook.azurewebsites.net',
  clientID: 'xWISM584Cwu5EcvXlvfGLisVvLoiXl9S',
  issuerBaseURL: 'https://dev-u15cfnmqexzcnfbq.us.auth0.com'
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(auth(config))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
