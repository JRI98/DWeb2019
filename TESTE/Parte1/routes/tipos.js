var express = require('express');
var router = express.Router();
var Obras = require('../controllers/obras');

router.get('/', function (req, res, next) {
	Obras.tipos()
		.then(dados => res.jsonp(dados))
		.catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;