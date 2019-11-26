const mongoose = require("mongoose")

// Esquema de um ficheiro
const FicheiroSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    desc: String,
    name: String,
    mimetype: String,
    size: Number,
})

module.exports = mongoose.model("ficheiro", FicheiroSchema, "ficheiros")
