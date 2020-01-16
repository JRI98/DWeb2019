var express = require('express');
var router = express.Router();
var Obras = require('../controllers/obras');

router.get('/', function (req, res) {
	Obras.quant()
		.then(dados => res.jsonp(dados))
		.catch(erro => res.status(500).jsonp(erro))
})

router.all("*", function (req, res) {
	res.jsonp({ error: "Route not found" })
})

module.exports = router;