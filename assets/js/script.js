document.querySelector("#salvar").addEventListener("click", cadastrarJogo)

let jogos = []

window.addEventListener("load", () => {
    jogos = JSON.parse(localStorage.getItem("jogos")) || []
    alteraTituloFiltro(jogos)
    atualizar()
})

function atualizar() {
    localStorage.setItem("jogos", JSON.stringify(jogos))
    document.querySelector("#jogos").innerHTML = ""
    jogos.forEach(jogo =>
        document.querySelector("#jogos").innerHTML += criaCard(jogo))

}

function filtrar(lista) {
    document.querySelector("#jogos").innerHTML = ""
    lista.forEach(jogo =>
        document.querySelector("#jogos").innerHTML += criaCard(jogo)
    )
}

function cadastrarJogo() {

    const titulo = document.querySelector("#titulo").value
    const descricao = document.querySelector("#descricao").value
    const imagemCapa = document.querySelector("#imgCapaJogo").value
    const plataforma = document.querySelector("#plataforma").value
    const categoria = document.querySelector("#categoria").value
    const precoPontos = document.querySelector("#pontos").value
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))

    const jogo = {
        id: Date.now(),
        titulo,
        descricao,
        imagemCapa,
        plataforma,
        categoria,
        precoPontos,
        disponivel: false
    }

    if (!isValid(jogo.titulo, document.querySelector("#titulo"))) return
    if (!isValid(jogo.descricao, document.querySelector("#descricao"))) return
    if (!isValid(jogo.imagemCapa, document.querySelector("#imgCapaJogo"))) return
    if (!isValid(jogo.plataforma, document.querySelector("#plataforma"))) return
    if (!isValid(jogo.categoria, document.querySelector("#categoria"))) return
    if (!isValid(jogo.precoPontos, document.querySelector("#pontos"))) return

    jogos.push(jogo)

    titulo.innerText = ""
    descricao.innerText = ""
    imagemCapa.innerText = ""
    plataforma.innerText = ""
    categoria.innerText = ""
    precoPontos.innerText = ""

    atualizar()
    modal.hide()
}

function isValid(valor, campo) {
    if (valor.length == 0) {
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    } else {
        campo.classList.add("is-valid")
        campo.classList.remove("is-invalid")
        return true
    }

}

function apagarJogo(id) {
    jogos = jogos.filter(jogo => jogo.id !== id)
    atualizar()
}

function adicionarEstoque(id) {
    let jogoEncontrado = jogos.find(jogo => jogo.id == id)

    jogoEncontrado.disponivel = true

    atualizar()
}


function criaCard(jogo) {

    let disabled = jogo.disponivel ? "disabled" : ""

    const card = `
    <div class="card text-bg-light my-2 mx-2 col-lg-4 col-md-5 col-sm-12">
    <img src="${jogo.imagemCapa}" class="mt-1 mx-auto card-img-top"
        style="border-radius: 8px;">
    <div class="card-body">
    <div class="card-title fw-bold fs-4">
    ${jogo.titulo}
    </div>
    <p class="card-tex text-primary fw-bolder fs-5 mb-0">Visão Geral:</p>
        <p class="card-text fs-6 fw-bold mt-3">${jogo.descricao}</p>
        <p class="card-tex text-primary fw-bolder fs-5 mb-0">Plataforma:</p>
        <p class="card-subtitle text-secondary fw-bold categorias">${jogo.plataforma}</p>
        <p class="card-tex text-primary fs-5 fw-bolder mb-0">Categoria:</p>
        <p class="card-subtitle text-secondary fw-bold categorias">${jogo.categoria}</p>
        <p class="card-text text-center text-primary fs-5 fw-bolder mb-1">Preço</p>
        <h4><span class="badge text-bg-primary d-flex fw-bold justify-content-center categorias">${jogo.precoPontos} pts</span></h4>
    </div >
        <div class="card-footer d-flex justify-content-around">
            <a href="#" class="btn btn-success ${disabled} col-3" title="Adicionar ao estoque" onClick ="adicionarEstoque(${jogo.id})" >
                <i class="bi bi-check2"></i>
            </a>
            <a href="#" class="btn btn-danger col-3" title="Não disponível" onClick="apagarJogo(${jogo.id})">
                <i class="bi bi-trash3"></i>
            </a>
        </div>
    </div >
    `

    return card
}
