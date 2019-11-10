var Prize = require("../models/prize")

module.exports.listar = () => {
    return Prize.find({}).sort({ year: "desc", category: "asc" }).exec()
}

module.exports.listarPremios = () => {
    return Prize.find({}, { _id: 0, year: 1, category: 1 }).exec()
}

module.exports.listarPremiosCategoria = (categoria) => {
    return Prize.find({ category: categoria }).exec()
}

module.exports.listarPremiosCategoriaData = (categoria, data) => {
    return Prize.find({ category: categoria, year: { $gt: data } }).exec()
}

module.exports.listarCategorias = () => {
    return Prize.distinct("category").exec()
}

module.exports.listarLaureados = () => {
    return Prize.aggregate()
        .unwind("$laureates")
        .group({
            _id: "$laureates.id",
            firstname: { $first: "$laureates.firstname" },
            surname: { $first: "$laureates.surname" },
            prizes: {
                $push: {
                    year: "$year",
                    category: "$category"
                }
            }
        })
        .sort({
            firstname: "asc",
            surname: "asc"
        })
        .project({
            _id: 0,
            name: { $concat: ["$firstname", " ", "$surname"] },
            prizes: 1
        })
        .exec()
}

module.exports.consultar = id => {
    return Prize.findOne({ _id: id }).exec()
}

module.exports.inserir = filme => {
    return Prize.create(filme)
}

module.exports.eliminar = id => {
    return Prize.deleteOne({ _id: id })
}

module.exports.atualizar = (id, filme) => {
    return Prize.replaceOne({ _id: id }, filme)
}
