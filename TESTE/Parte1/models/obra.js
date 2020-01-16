var mongoose = require('mongoose')

var PartituraSchema = new mongoose.Schema({
    _id: String,
    _type: String,
    _path: String
})

var InstrumentoSchema = new mongoose.Schema({
    designacao: String,
    partitura: PartituraSchema
})

var ObraSchema = new mongoose.Schema({
    _id: String,
    titulo: String,
    tipo: String,
    compositor: String,
    instrumentos: [InstrumentoSchema],
    compositor: String,
    duracao: String
})

module.exports = mongoose.model('obra', ObraSchema, "obras")
