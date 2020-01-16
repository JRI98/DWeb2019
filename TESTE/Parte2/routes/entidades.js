var express = require('express')
var router = express.Router()
var axios = require('axios').default

const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ";

// Construir o URL para aceder a uma certa parte da API do CLAV
function assembleClavUrl(part) {
    return `http://clav-api.dglab.gov.pt/api/${part}?apikey=${apikey}`
}

/*
    Pedidos GET
*/
// GET da página com todas as entidades
router.get(["/", "/entidades"], function (req, res, next) {
    axios.get(assembleClavUrl("entidades"))
        .then((entidades) => res.render('index', { entidades: entidades.data }))
        .catch((err) => {
            console.log(err.response.data)
            res.status(400).render('error', { error: err })
        })
})

// GET da página de uma entidade
router.get('/entidades/:id', (req, res, next) => {
    axios.get(assembleClavUrl(`entidades/${req.params.id}`))
        .then(entidade => {
            axios.get(assembleClavUrl(`entidades/${req.params.id}/intervencao/dono`))
                .then(dono => {
                    axios.get(assembleClavUrl(`entidades/${req.params.id}/tipologias`))
                        .then(tipologias => {
                            axios.get(assembleClavUrl(`entidades/${req.params.id}/intervencao/participante`))
                                .then(participante => {
                                    entidade.data.link = assembleClavUrl(`entidades/${req.params.id}`)
                                    dono.data.forEach(d => {
                                        d.link = assembleClavUrl(`entidades/${req.params.id}/intervencao/dono`)
                                    });
                                    tipologias.data.forEach(t => {
                                        t.link = assembleClavUrl(`entidades/${req.params.id}/tipologias`)
                                    });
                                    participante.data.forEach(p => {
                                        p.link = assembleClavUrl(`entidades/${req.params.id}/intervencao/participante`)
                                    });

                                    res.render('entidade', { e: entidade.data, dono: dono.data, tipologias: tipologias.data, participante: participante.data })
                                })
                                .catch(err => {
                                    console.log(err.response.data)
                                    res.status(400).render('error', { error: err })
                                })
                        })
                        .catch(err => {
                            console.log(err.response.data)
                            res.status(400).render('error', { error: err })
                        })
                })
                .catch(err => {
                    console.log(err.response.data)
                    res.status(400).render('error', { error: err })
                })
        })
        .catch(err => {
            console.log(err.response.data)
            res.status(400).render('error', { error: err })
        })
})

module.exports = router
