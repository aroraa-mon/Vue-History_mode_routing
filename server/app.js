var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var history = require('connect-history-api-fallback');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware for serving '/dist' directory
//const detailMW = express.static('details');
const staticFileMiddleware = express.static('dist');

// 1st call for unredirected requests 
//app.use(staticFileMiddleware);

//Support history api 
app.use(history({
  index: 'index.html'
}));
// app.use("/*", express.static(path.join(__dirname, 'index.html')));
// 2nd call for redirected requests
//app.use(detailMW);
app.use(staticFileMiddleware);
app.use('/users', usersRouter);

// app.use(express.static(path.join(__dirname, 'dist')));
// //app.get(/.*/,(req,res)=>res.sendFile(path.resolve(__dirname,'dist/index.html')))


// app.use(history({
//   //index: '/dist/index.html'
//   rewrites: [
//     { from: /\/dist/, to: '/dist/index.html'}
//   ]
// }));
//app.use('/user', usersRouter);
//app.use("/", express.static(path.join(__dirname, '/dist/index.html')));
// //app.use("/user/*", express.static(path.join(__dirname, 'dist/index.html')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //console.log(error);
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
