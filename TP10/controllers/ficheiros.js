const Ficheiro = require("../models/ficheiro")

// Listar todos os ficheiros da BD
module.exports.listar = () => {
    return Ficheiro.find().exec()
}
