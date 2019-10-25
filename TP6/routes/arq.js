var express = require('express')
var router = express.Router()
var jsonfile = require("jsonfile")

// Caminho do ficheiro JSON da base de dados
const myDB = "arq-son-EVO.json"

// Envia uma página de erro ao cliente, indicando que o elemento não existe
function noArq(res) {
    res.status(400).render('error', { message: "Elemento não existe", error: { status: "O elemento pedido não foi encontrado" } })
}

/*
    Pedidos GET
*/
// GET da página principal
router.get(['/', "/arq"], function (req, res, next) {
    jsonfile.readFile(myDB, (err, arq) => {
        if (!err)
            res.render('index', { arq: arq.arq.doc })
        else {
            console.log(err)
            res.status(400).render('error', { error: err })
        }
    })
})

// GET da página de adição de elementos
router.get('/arq/add', function (req, res, next) {
    res.render('add')
})

// GET da página de um elemento
router.get('/arq/:id', function (req, res, next) {
    jsonfile.readFile(myDB, (err, arq) => {
        if (!err) {
            const a = arq.arq.doc.find((value) => value.key == req.params.id)
            if (a)
                res.render("arq", { a: a })
            else
                noArq(res)
        } else {
            console.log(err)
            res.status(400).render('error', { error: err })
        }
    })
})

// GET da página de edição de um elemento
router.get('/arq/update/:id', function (req, res, next) {
    jsonfile.readFile(myDB, (err, arq) => {
        if (!err) {
            const a = arq.arq.doc.find((value) => value.key == req.params.id)
            if (a)
                res.render("update", { a: a })
            else
                noArq(res)
        } else {
            console.log(err)
            res.status(400).render('error', { error: err })
        }
    })
})

/*
    Pedidos DELETE
*/
// DELETE de um elemento
router.delete("/arq/:id", function (req, res, next) {
    jsonfile.readFile(myDB, (err, arq) => {
        if (!err) {
            const idx = arq.arq.doc.findIndex((value, index, array) => value.key == req.params.id)
            if (idx != -1) {
                arq.arq.doc.splice(idx, 1)
                jsonfile.writeFile(myDB, arq, err => {
                    if (!err) {
                        console.log("Elemento eliminado com sucesso...")
                        res.sendStatus(200)
                    } else {
                        console.log(err)
                        res.status(400).render('error', { error: err })
                    }
                })
            } else
                noArq(res)
        } else {
            console.log(err)
            res.status(400).render('error', { error: err })
        }
    })
})

/*
    Pedidos POST
*/
// POST de um novo elementp
router.post("/arq/new", function (req, res, next) {
    jsonfile.readFile(myDB, (err, arq) => {
        if (!err) {
            req.body.key = arq.nextKey
            arq.nextKey++
            arq.arq.doc.push(req.body)
            jsonfile.writeFile(myDB, arq, err => {
                if (!err) {
                    console.log("Elemento gravado com sucesso...")
                    res.redirect("/arq/" + req.body.key)
                } else {
                    console.log(err)
                    res.status(400).render('error', { error: err })
                }
            })
        } else {
            console.log(err)
            res.status(400).render('error', { error: err })
        }
    })
})

/*
    Pedidos PUT
*/
// PUT de um elemento atualizado
router.put("/arq/:id", function (req, res, next) {
    jsonfile.readFile(myDB, (err, arq) => {
        if (!err) {
            const idx = arq.arq.doc.findIndex((value, index, array) => value.key == req.params.id)
            if (idx != -1) {
                req.body.key = req.params.id
                arq.arq.doc[idx] = req.body
                jsonfile.writeFile(myDB, arq, err => {
                    if (!err) {
                        console.log("Elemento atualizado com sucesso...")
                        res.sendStatus(200)
                    } else {
                        console.log(err)
                        res.status(400).render('error', { error: err })
                    }
                })
            } else
                noArq(res)
        } else {
            console.log(err)
            res.status(400).render('error', { error: err })
        }
    })
})

module.exports = router
