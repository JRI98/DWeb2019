const express = require('express');
const router = express.Router();
const axios = require("axios")
const lhost = require("../config/env").host

// GET home page
router.get('/', function (req, res, next) {
    axios.get(lhost + "/api/ficheiros")
        .then(dados => {
            res.render("index", { lista: dados.data })
        })
        .catch(err => {
            res.render("error", { error: err })
        })
});

// Download a file
router.get('/download/:fname', function (req, res, next) {
    res.download(__dirname + "/../public/ficheiros/" + req.params.fname)
})

module.exports = router;
