var express = require('express')
var router = express.Router()
var axios = require('axios').default

const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ";

// Construir o URL para aceder a uma certa parte da API do CLAV
function getClavUrl(part) {
    return `http://clav-api.dglab.gov.pt/api/${part}?apikey=${apikey}`
}

/*
    Pedidos GET
*/
// GET da página com todas as entidades
router.get(["/", "/entidades"], function (req, res, next) {
    axios.get(getClavUrl("entidades"))
        .then((entidades) => res.render('index', { entidades: entidades.data }))
        .catch((err) => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

// GET da página de uma entidade
router.get('/entidades/:id', function (req, res, next) {
    axios.get(getClavUrl(`entidades/${req.params.id}`))
        .then(entidade => {
            axios.get(getClavUrl(`entidades/${req.params.id}/intervencao/dono`))
                .then(dono => {
                    axios.get(getClavUrl(`entidades/${req.params.id}/tipologias`))
                        .then(tipologias => {
                            axios.get(getClavUrl(`entidades/${req.params.id}/intervencao/participante`))
                                .then(participante => {
                                    res.render('entidade', { e: entidade.data, dono: dono.data, tipologias: tipologias.data, participante: participante.data })
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(400).render('error', { error: err })
                                })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).render('error', { error: err })
                        })
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).render('error', { error: err })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(400).render('error', { error: err })
        })
})

module.exports = router
