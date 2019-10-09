var http = require("http")
var fs = require("fs")
var path = require("path")

var myServer = http.createServer(function (req, res) {
    var parts = req.url.split("/")
    var pag = parts[parts.length - 1]
    switch (pag) {
        case "favicon.ico":
            fs.readFile(path.join("files", "favicon.ico"), function (err, data) {
                res.writeHead(200, { 'Content-Type': 'image/x-icon' })
                res.write(data)
                res.end()
            })
            break;

        case "arq2html.xsl":
            fs.readFile(path.join("files", "arq2html.xsl"), function (err, data) {
                res.writeHead(200, { 'Content-Type': 'text/xsl' })
                res.write(data)
                res.end()
            })
            break;

        default:
            fs.readFile(path.join("files", "arq" + pag + ".xml"), function (err, data) {
                // Se o ficheiro não existir, devolver página de erro
                if (err !== null) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write("<h1 style='text-align: center; margin: auto; margin: auto'>Ficheiro inexistente: \"" + pag + "\"</h1>")
                    res.end()
                    return
                }

                // Se o ficheiro existir, devolver o conteúdo do mesmo
                res.writeHead(200, { 'Content-Type': 'text/xml' })
                res.write(data)
                res.end()
            })
            break;
    }
})

myServer.listen(7777)

console.log("Server listening at 7777...")
