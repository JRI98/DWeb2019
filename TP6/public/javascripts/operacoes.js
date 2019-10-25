// Apagar elemento do arquivo sonoro da BD
function eliminar(ident) {
    axios.delete("/arq/" + ident)
        .then(response => window.location.assign("/"))
        .catch(err => console.log(err))
}

// Atualizar um elemento do arquivo sonoro da BD
function atualizar(ident) {
    const newArq = {
        prov: document.getElementById("prov").value,
        local: document.getElementById("local").value,
        tit: document.getElementById("tit").value,
        musico: document.getElementById("musico").value,
        duracao: document.getElementById("duracao").value
    }

    axios.put("/arq/" + ident, newArq)
        .then(response => window.location.assign("/arq/" + ident))
        .catch(err => console.log(err))
}
