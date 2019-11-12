var express = require('express');
var router = express.Router();
var Obras = require('../controllers/obras');

router.get('/obras', function (req, res, next) {
	if ("ano" in req.query) {
		Obras.listarAno(req.query.ano)
			.then(dados => res.jsonp(dados))
			.catch(erro => res.status(500).jsonp(erro))
	} else if ("compositor" in req.query && "duracao" in req.query) {
		Obras.listarCompDur(req.query.compositor, req.query.duracao)
			.then(dados => res.jsonp(dados))
			.catch(erro => res.status(500).jsonp(erro))
	} else if ("periodo" in req.query) {
		Obras.listarPeriodo(req.query.periodo)
			.then(dados => res.jsonp(dados))
			.catch(erro => res.status(500).jsonp(erro))
	} else {
		Obras.listar()
			.then(dados => res.jsonp(dados))
			.catch(erro => res.status(500).jsonp(erro))
	}
});

router.get('/obras/:id', function (req, res) {
	Obras.consultar(req.params.id)
		.then(dados => res.jsonp(dados))
		.catch(erro => res.status(500).jsonp(erro))
});

router.get('/compositores', function (req, res) {
	Obras.compositores()
		.then(dados => res.jsonp(dados))
		.catch(erro => res.status(500).jsonp(erro))
})

router.get('/periodos', function (req, res) {
	Obras.periodos()
		.then(dados => res.jsonp(dados))
		.catch(erro => res.status(500).jsonp(erro))
});

router.all("*", function (req, res) {
	res.jsonp({ error: "Route not found" })
})

module.exports = router;