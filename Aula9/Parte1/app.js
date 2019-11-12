var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/obra', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongo: ready (" + mongoose.connection.readyState + ")"))
  .catch((erro) => console.log("Mongo: erro na conexão - " + erro))

var app = express();
app.use(logger('dev'));
app.use('/', require('./routes/obras'));

module.exports = app;
