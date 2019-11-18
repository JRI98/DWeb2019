// mongoimport --db prize --collection prize --file prize.json

const jsonfile = require("jsonfile");
const mongoose = require("mongoose");

const args = process.argv.slice(2)

// Verificar se todos os argumentos foram especificados
if (!args.includes("--db") || !args.includes("--collection") || !args.includes("--file")) {
    console.log("Por favor, indique o nome da base de dados, o nome da coleção e o nome do ficheiro JSON")
    process.exit(1)
}

// Guardar os argumentos num objeto
const argsObject = {}
for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
        case "--db":
            argsObject.db = args[i + 1]
            i++
            break;

        case "--collection":
            argsObject.collection = args[i + 1]
            i++
            break;

        case "--file":
            argsObject.file = args[i + 1]
            i++
            break;

        case "--jsonArray":
            argsObject.jsonArray = true
            break;

        default:
            break;
    }
}

// Conectar à base de dados especificada
mongoose.connect("mongodb://localhost/" + argsObject.db, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
        console.log("Mongo: connection error")
        return
    }

    // Conectar à coleção especificada
    mongoose.connection.db.collection(argsObject.collection, (err, collection) => {
        if (err) {
            console.log("Erro ao aceder à coleção: " + err);
            return;
        }

        // Ler o ficheiro JSON especificado
        jsonfile.readFile(argsObject.file, (err, data) => {
            if (err) {
                console.log("Erro a ler o ficheiro: " + err);
                return
            }

            // Guardar os dados dependendo do tipo especificado pelo utilizador (--jsonArray)
            if (argsObject.jsonArray) {
                collection.insertMany(data, (err, result) => {
                    if (err) {
                        console.log("Erro a guardar os documentos: " + err);
                        return
                    }

                    console.log(result.insertedCount + " documentos inseridos");

                    mongoose.connection.close((err) => {
                        if (err)
                            console.log("Erro a fechar a base de dados: " + err);
                    })
                })
            } else {
                collection.insertOne(data, (err, result) => {
                    if (err) {
                        console.log("Erro a guardar o documento: " + err);
                        return
                    }

                    console.log(result.insertedCount + " documento inserido");

                    mongoose.connection.close((err) => {
                        if (err)
                            console.log("Erro a fechar a base de dados: " + err);
                    })
                })
            }
        })
    })
})
