var express = require('express')
var router = express.Router()
var Prizes = require("../controllers/prizes")
var axios = require('axios').default

/*
    Pedidos GET
*/
// GET da página principal
router.get(["/", "/premios"], function (req, res, next) {
    axios.get("http://localhost:3000/api/premiosAll")
        .then((premios) => res.render('index', { premios: premios.data }))
        .catch((err) => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

// GET da página de adição de filmes
router.get('/premios/add', function (req, res, next) {
    res.render('add')
})

// GET da página de um filme
router.get('/premios/:id', function (req, res, next) {
    axios.get(`http://localhost:3000/api/premios/${req.params.id}`)
        .then(premio => res.render('premio', { p: premio.data }))
        .catch(err => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

// GET da página de edição de um filme
router.get('/premios/update/:id', function (req, res, next) {
    axios.get(`http://localhost:3000/api/premios/${req.params.id}`)
        .then(premio => res.render('update', { premio: premio.data }))
        .catch(err => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

module.exports = router
