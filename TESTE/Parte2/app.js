var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

// Configurar o PUG
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Configurar o middleware
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas relacionadas com as entidades
app.use('/', require('./routes/entidades'));

// Configurar resposta aos erros 404
app.use(function (req, res, next) {
    next(createError(404));
});

// Gestor de erros
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
