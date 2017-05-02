var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var db = require('./db');
var mongoose = require('mongoose');

//var index = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
//app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);
app.get('/',function(req,res,next){
  res.render('index');
});

/*app.get('/result',function(req,res,next){
    res.render('result');
});*/

app.post('/result',function(req,res,next){
    console.log(req.body);
    console.log(req.body.Initials);
    console.log('hhhh');
    mongoose.connect('mongodb://localhost/hw07');
    var newResult = new db.Result({ computerScore: req.body.computertval ,userScore: req.body.playertval,userInitials: req.body.Initials});
    newResult.save(function (err, newResult) {
        if (err){
            // callback(false);
            res.send(err);
            //return console.error(err)
        };

        db.Result.find('',function(err, Result, count){
            console.log('Result:   '+Result);
            mongoose.disconnect(function(){
                console.log('connection disconnect');
                // res.redirect('/result');
                res.json(Result);
            });
        });
       /* mongoose.disconnect(function(){
            console.log('connection disconnect');
           // res.redirect('/result');
        });*/
        //callback(true);
       // res.redirect('/');
        //res.send('hhhh');
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
