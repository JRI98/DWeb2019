// Apagar elemento do arquivo sonoro da BD
function eliminar(id) {
    axios.delete("/filmes/" + id)
        .then(response => window.location.assign("/"))
        .catch(err => console.log(err))
}

// Atualizar um elemento do arquivo sonoro da BD
function atualizar(id) {
    const newFilm = {
        title: document.getElementById("title").value,
        year: document.getElementById("year").value,
    }

    axios.put("/filmes/" + id, newFilm)
        .then(response => window.location.assign("/filmes/" + id))
        .catch(err => console.log(err))
}
