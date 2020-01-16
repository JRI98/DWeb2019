var Obra = require('../models/obra')

// Listar todas as obras, mostrando: _id, titulo, tipo e compositor
module.exports.listar = () => {
    return Obra.find({}, { _id: 1, titulo: 1, tipo: 1, compositor: 1 }).exec()
}

// Consultar toda a informação de uma obra: dado o _id
module.exports.consultar = id => {
    return Obra.findOne({ _id: id }).exec()
}

// Listar todos os tipos únicos de obras
module.exports.tipos = () => {
    return Obra.distinct("tipo").exec()
}

// Listar todas as obras de um determinado compositor
module.exports.listarCompositor = compositor => {
    return Obra.find({ compositor: compositor }).exec()
}

// Listar todas as obras que utilizam um determinado instrumento
module.exports.listarInstrumento = (instrumento) => {
    return Obra.find({ "instrumentos.designacao": instrumento }).exec()
}

// Listar todas as obras com o número de partituras associado a cada uma
module.exports.quant = () => {
    return Obra.aggregate()
        .unwind("$instrumentos")
        .group({
            _id: "$_id",
            titulo: {
                $first: "$titulo"
            },
            partituras: {
                $sum: 1
            }
        }).exec()
}
