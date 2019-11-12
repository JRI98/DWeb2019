var Obra = require('../models/obra')

module.exports.listar = () => {
    return Obra.find().exec()
}

module.exports.listarAno = ano => {
    return Obra.find({ anoCriacao: ano }).exec()
}

module.exports.listarCompDur = (compositor, duracao) => {
    return Obra.find({ compositor: compositor, duracao: { $gte: duracao } }).exec()
}

module.exports.listarPeriodo = periodo => {
    return Obra.find({ periodo: periodo }).exec()
}

module.exports.consultar = id => {
    return Obra.findOne({ _id: id }).exec()
}

module.exports.compositores = () => {
    return Obra.distinct("compositor").exec()
}

module.exports.periodos = () => {
    return Obra.distinct("periodo").exec()
}
