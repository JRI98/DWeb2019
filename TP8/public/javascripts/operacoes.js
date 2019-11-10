// Apagar um prémio
function eliminar(id) {
    axios.delete(`/api/premios/${id}`)
        .then(response => window.location.assign("/"))
        .catch(err => console.log(err))
}

// Atualizar um prémio
function atualizar(id) {
    const newPremio = {
        year: document.getElementById("year").value,
        category: document.getElementById("category").value,
    }

    axios.put(`/api/premios/${id}`, newPremio)
        .then(response => window.location.assign("/premios/" + id))
        .catch(err => console.log(err))
}
