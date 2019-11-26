// Função para lidar com o clique em "+1"
$(function () {
    var cont = 1

    $("#mais1").click(e => {
        e.preventDefault()
        cont++
        var campo = $("<div></div>", { class: "w3-container", id: "f" + cont })

        var numFicheiro = $("<p>Ficheiro " + cont + "</p>")
        var desc = $("<input/>", { class: "w3-input w3-border w3-section w3-light-grey", type: "text", name: "desc", placeholder: "Descrição" })
        var ficheiro = $("<input/>", { class: "w3-input w3-border w3-section w3-light-grey", type: "file", name: "ficheiro" })

        $("#lista").append(campo)

        $("#f" + cont).append(numFicheiro, desc, ficheiro)
    })
})

// Função para apresentar o modal com a informação de um ficheiro
function showFicheiro(f) {
    if (f.mimetype == "image/png" || f.mimetype == "image/jpg" || f.mimetype == "image/jpeg")
        var ficheiro = $("<img src=/ficheiros/" + f.name + " style='display: block; margin-left: auto; margin-right: auto; width: 80%'\>")
    else
        var ficheiro = $("<p>" + JSON.stringify(f) + "</p>")

    var download = $("<div style='text-align: center'><a href=/download/" + f.name + ">Download</a></div>")
    $("#display").empty()
    $("#display").append(ficheiro, download)
    $("#display").modal()
}
