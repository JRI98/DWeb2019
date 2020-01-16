var express = require('express');
var router = express.Router();
var Obras = require('../controllers/obras');

router.get('/', function (req, res, next) {
	if ("compositor" in req.query) {
		Obras.listarCompositor(req.query.compositor)
			.then(dados => res.jsonp(dados))
			.catch(erro => res.status(500).jsonp(erro))
	} else if ("instrumento" in req.query) {
		Obras.listarInstrumento(req.query.instrumento)
			.then(dados => res.jsonp(dados))
			.catch(erro => res.status(500).jsonp(erro))
	} else {
		Obras.listar()
			.then(dados => res.jsonp(dados))
			.catch(erro => res.status(500).jsonp(erro))
	}
});

router.get('/:id', function (req, res) {
	Obras.consultar(req.params.id)
		.then(dados => res.jsonp(dados))
		.catch(erro => res.status(500).jsonp(erro))
});

router.all("*", function (req, res) {
	res.jsonp({ error: "Route not found" })
})

module.exports = router;