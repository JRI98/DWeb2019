var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose')

// Fazer a ligação ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/teste', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Ligação ao MongoDB estabelecida com sucesso"))
  .catch((erro) => console.log("Erro a conectar ao MongoDB - " + erro))

// Iniciar a aplicação Express
var app = express();
app.use(logger('dev'));

// Configurar as rotas
app.use('/api/obras', require('./routes/obras'));
app.use('/api/obrasQuant', require('./routes/obrasQuant'));
app.use('/api/tipos', require('./routes/tipos'));

module.exports = app;
