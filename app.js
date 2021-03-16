var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(passport.initialize());

require('./authenticate');
require('./fbauthenticate');
require('./githubauthenticate');

app.get('/facebook',
  passport.authenticate('facebook')
);

app.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
                                        //res.redirect('/');
                                        res.end('Logged in!');
                                      });

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  //res.redirect('/');
  res.end('Logged in!');
})

app.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    //res.redirect('/');
    res.end('Logged in!');
  });

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

app.listen(3000,()=>{
  console.log("Server is up and running");
})

module.exports = app;
