var express = require('express')
var router = express.Router()
var Filmes = require("../controllers/filmes")

/*
    Pedidos GET
*/
// GET da página principal (limite de 25 filmes)
router.get(["/", "/filmes"], function (req, res, next) {
    Filmes.listar(true)
        .then((filmes) => res.render('index', { filmes }))
        .catch((err) => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

// GET da página principal (todos os filmes)
router.get(["/all", "/filmes/all"], function (req, res, next) {
    Filmes.listar(false)
        .then((filmes) => res.render('index', { filmes }))
        .catch((err) => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

// GET da página de adição de filmes
router.get('/filmes/add', function (req, res, next) {
    res.render('add')
})

// GET da página de um filme
router.get('/filmes/:id', function (req, res, next) {
    Filmes.consultar(req.params.id)
        .then(film => res.render('film', { film }))
        .catch(err => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

// GET da página de edição de um filme
router.get('/filmes/update/:id', function (req, res, next) {
    Filmes.consultar(req.params.id)
        .then(film => res.render('update', { film }))
        .catch(err => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

/*
    Pedidos DELETE
*/
// DELETE de um filme
router.delete("/filmes/:id", function (req, res, next) {
    Filmes.eliminar(req.params.id)
        .then(dados => {
            console.log("Filme eliminado com sucesso...")
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

/*
    Pedidos POST
*/
// POST de um novo filme
router.post("/filmes", function (req, res, next) {
    const film = {
        title: req.body.title,
        year: req.body.year,
    }
    Filmes.inserir(film)
        .then(dados => {
            console.log("Filme gravado com sucesso...")
            res.redirect("/filmes/" + dados._id)
        })
        .catch(err => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

/*
    Pedidos PUT
*/
// PUT de um filme atualizado
router.put("/filmes/:id", function (req, res, next) {
    Filmes.atualizar(req.params.id, req.body)
        .then(dados => {
            console.log("Filme atualizado com sucesso...")
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

module.exports = router
