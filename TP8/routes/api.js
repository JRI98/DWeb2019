var express = require('express')
var router = express.Router()
var Prizes = require("../controllers/prizes")

// Função que responde com um objeto JSON que indica um erro
function sendError(res, err) {
    res.status(400).jsonp({ error: err })
}

/*
    Pedidos GET
*/
// GET do ano e da categoria dos prémios
router.get("/premios", function (req, res, next) {
    if ("categoria" in req.query) {
        if ("data" in req.query) {
            Prizes.listarPremiosCategoriaData(req.query.categoria, req.query.data)
                .then(premios => res.jsonp(premios))
                .catch((err) => {
                    console.log(err)
                    sendError(res, "Could not retrieve the prizes")
                })
        } else {
            Prizes.listarPremiosCategoria(req.query.categoria)
                .then(premios => res.jsonp(premios))
                .catch((err) => {
                    console.log(err)
                    sendError(res, "Could not retrieve the prizes")
                })
        }
    } else {
        Prizes.listarPremios()
            .then(premios => res.jsonp(premios))
            .catch((err) => {
                console.log(err)
                sendError(res, "Could not retrieve the prizes")
            })
    }
})

// GET de todos os prémios
router.get("/premiosAll", function (req, res, next) {
    Prizes.listar()
        .then(premios => res.jsonp(premios))
        .catch((err) => {
            console.log(err)
            sendError(res, "Could not retrieve the prizes")
        })
})

// GET de um prémio
router.get('/premios/:id', function (req, res, next) {
    Prizes.consultar(req.params.id)
        .then(premio => res.jsonp(premio))
        .catch(err => {
            console.log(err)
            sendError(res, "Could not retrieve the prize")
        })
})

// GET da lista de categorias dos prémios
router.get('/categorias', function (req, res, next) {
    Prizes.listarCategorias()
        .then(categorias => res.jsonp(categorias))
        .catch(err => {
            console.log(err)
            sendError(res, "Could not retrieve the categories")
        })
})

// GET da lista de premiados, ordenados alfabeticamente
router.get('/laureados', function (req, res, next) {
    Prizes.listarLaureados()
        .then(laureados => res.jsonp(laureados))
        .catch(err => {
            console.log(err)
            sendError(res, "Could not retrieve the laureates")
        })
})

/*
    Pedidos DELETE
*/
// DELETE de um prémio
router.delete("/premios/:id", function (req, res, next) {
    Prizes.eliminar(req.params.id)
        .then(dados => {
            console.log("Prémio eliminado com sucesso...")
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
// POST de um novo prémio
router.post("/premios", function (req, res, next) {
    const premio = {
        year: req.body.year,
        category: req.body.category,
    }
    Prizes.inserir(premio)
        .then(dados => {
            console.log("Prémio gravado com sucesso...")
            res.redirect("/premios/" + dados._id)
        })
        .catch(err => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

/*
    Pedidos PUT
*/
// PUT de um prémio atualizado
router.put("/premios/:id", function (req, res, next) {
    Prizes.atualizar(req.params.id, req.body)
        .then(dados => {
            console.log("Prémio atualizado com sucesso...")
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

/*
    Pedidos restantes
*/
router.all("*", function (req, res, next) {
    sendError(res, "Path not found")
})

module.exports = router
