var http = require("http")
var fs = require("fs")
var path = require("path")

var myServer = http.createServer(function (req, res) {
    var parts = req.url.split("/")
    var pag = parts[parts.length - 1]
    if (pag === "favicon.ico") {
        fs.readFile("favicon.ico", function (err, data) {
            res.writeHead(200, { 'Content-Type': 'image/x-icon' })
            res.write(data)
            res.end()
        })
    } else {
        fs.readFile(path.join("files", "arq" + pag + ".xml"), function (err, data) {
            if (err !== null) {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write("<h1 style='text-align: center'>Ficheiro inexistente: " + pag + "</h1>")
                res.end()
            } else {
                res.writeHead(200, { 'Content-Type': 'application/xml' })
                res.write(data)
                res.end()
            }
        })
    }
})

myServer.listen(7777)

console.log("Server listening at 7777...")
