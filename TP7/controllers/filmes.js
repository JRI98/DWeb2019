var Filme = require("../models/filme")

module.exports.listar = limit => {
    if (limit)
        return Filme.find().sort({ title: 1 }).limit(25).exec()
    else
        return Filme.find().sort({ title: 1 }).exec()
}

module.exports.consultar = id => {
    return Filme.findOne({ _id: id }).exec()
}

module.exports.inserir = filme => {
    return Filme.create(filme)
}

module.exports.eliminar = id => {
    return Filme.deleteOne({ _id: id })
}

module.exports.atualizar = (id, filme) => {
    return Filme.updateOne({ _id: id }, filme)
}
