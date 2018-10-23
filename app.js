// // var createError = require('http-errors');
// var express = require('express');
// var path = require('path');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// module.exports = app;

var http = require("http");

http.createServer(function(req, res){
res.writeHead(200, {"Content-Type":"text/plain"});
res.end("Hello World - Do an nhung can ban");

}).listen(9999);
