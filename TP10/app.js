const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Ligar à base de dados MongoDB
mongoose.connect('mongodb://localhost/ficheiros', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongo: ready (" + mongoose.connection.readyState + ")"))
    .catch(() => console.log("Mongo: connection error"));

// Inicializar o motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Ativar o middleware necessário
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Adicionar as rotas
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
