var mongoose = require("mongoose")

var Schema = mongoose.Schema

var FilmeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    cast: [String],
    genres: [String]
})

module.exports = mongoose.model("filmes", FilmeSchema, "filmes")
