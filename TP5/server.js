var http = require("http")
var url = require("url")
var pug = require("pug")
var fs = require("fs")
var jsonfile = require("jsonfile")

var { parse } = require("querystring")

var myDB = "tarefas.json"

var myServer = http.createServer((req, res) => {
    var pathname = url.parse(req.url, true).pathname

    console.log(req.method + ": " + pathname)

    switch (req.method) {
        case "GET":
            switch (pathname) {
                case "/favicon.ico":
                    fs.readFile("favicon.ico", function (err, data) {
                        if (!err) {
                            res.writeHead(200, { "Content-Type": "image/x-icon" })
                            res.write(data)
                        }
                        res.end()
                    })
                    break;

                case "/":
                case "/listaTarefas":
                    jsonfile.readFile(myDB, (err, tarefas) => {
                        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                        if (!err)
                            res.write(pug.renderFile("templates/index.pug", { lista: tarefas }))
                        else
                            res.write(pug.renderFile("templates/error.pug", { e: "Erro na leitura da BD..." }))
                        res.end()
                    })

                    break;

                case "/w3.css":
                    fs.readFile("stylesheets/w3.css", (err, data) => {
                        if (!err) {
                            res.writeHead(200, { "Content-Type": "text/css" })
                            res.write(data)
                        } else {
                            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                            res.write("<p>ERRO:" + err + "</p >")
                        }
                        res.end()
                    })

                    break;

                default:
                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                    res.write(pug.renderFile("templates/error.pug", { e: "ERRO: a página '" + pathname.slice(1) + "' não foi encontrada..." }))
                    res.end()

                    break;
            }

            break;

        case "POST":
            if (pathname == "/tarefa") {
                processInfo(req, result => {
                    jsonfile.readFile(myDB, (err, tarefas) => {
                        if (!err) {
                            tarefas.push(result)
                            jsonfile.writeFile(myDB, tarefas, err => {
                                if (!err) {
                                    console.log("Lista de tarefas guardada com sucesso...")

                                    res.writeHead(302, { "Location": "/" });
                                    res.end();
                                } else
                                    console.log(err)
                            })
                        } else {
                            console.log("Não foi possível ler da base de dados...")
                        }
                    })
                })
            } else {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                res.write(pug.renderFile("templates/error.pug", { e: "ERRO: a página '" + pathname.slice(1) + "' não foi encontrada..." }))
                res.end()
            }

            break;

        default:
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
            res.write(pug.renderFile("templates/error.pug", { e: "ERRO: " + req.method + " não suportado..." }))
            res.end()

            console.log("ERRO: " + req.method + " não suportado...")

            break;
    }

})

myServer.listen(5005, () => {
    console.log("Servidor à escuta na porta 5005...");
})

function processInfo(request, callback) {
    if (request.headers["content-type"] == "application/x-www-form-urlencoded") {
        let body = ""
        request.on("data", bloco => {
            body += bloco.toString()
        })
        request.on("end", () => {
            callback(parse(body))
        })
    }
}
