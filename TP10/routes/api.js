const express = require('express');
const Ficheiro = require("../models/ficheiro")
const Ficheiros = require("../controllers/ficheiros")
const fs = require("fs")
const router = express.Router();

const multer = require("multer")
const upload = multer({ dest: "uploads/" })

// GET files
router.get('/ficheiros', function (req, res) {
    Ficheiros.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

// POST files
router.post('/ficheiros', upload.array("ficheiro"), function (req, res) {
    for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const oldPath = __dirname + "/../" + file.path
        const newPath = __dirname + "/../public/ficheiros/" + file.originalname

        fs.rename(oldPath, newPath, (err) => {
            if (err)
                throw err
        })

        const novoFicheiro = new Ficheiro({
            date: new Date().toISOString(),
            desc: req.body.desc[i],
            name: file.originalname,
            mimetype: file.mimetype,
            size: file.size
        })

        novoFicheiro.save((err, _ficheiro) => {
            if (err)
                console.log("ERRO: " + err);
            else
                console.log("File successfully saved");
        })
    }
    res.redirect("/")
})

module.exports = router;
