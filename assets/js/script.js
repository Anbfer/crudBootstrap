document.querySelector("#salvar").addEventListener("click", cadastrarJogo)

let jogos = []

window.addEventListener("load", () => {
    jogos = JSON.parse(localStorage.getItem("jogos")) || []
    atualizar()
})

function atualizar() {
    document.querySelector("#jogos").innerHTML = ""
    jogos.forEach(jogo =>
        document.querySelector("#jogos").innerHTML += criaCard(jogo))
}

function cadastrarJogo() {

    const titulo = document.querySelector("#titulo").value
    const descricao = document.querySelector("#descricao").value
    const imagemCapa = document.querySelector("#imgCapaJogo").value
    const plataforma = document.querySelector("#plataforma").value
    const categoria = document.querySelector("#categoria").value
    const precoPontos = document.querySelector("#pontos").value

    const jogo = {
        titulo,
        descricao,
        imagemCapa,
        plataforma,
        categoria,
        precoPontos
    }

    if (!isValid(jogo.titulo, document.querySelector("#titulo"))) return
    if (!isValid(jogo.descricao, document.querySelector("#descricao"))) return
    if (!isValid(jogo.imagemCapa, document.querySelector("#imgCapaJogo"))) return
    if (!isValid(jogo.plataforma, document.querySelector("#plataforma"))) return
    if (!isValid(jogo.categoria, document.querySelector("#categoria"))) return
    if (!isValid(jogo.precoPontos, document.querySelector("#pontos"))) return

    jogos.push(jogo)
    localStorage.setItem("jogos", JSON.stringify(jogos))

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

function apagar(botao) {
    botao.parentNode.parentNode.parentNode.remove()
}

function criaCard(jogo) {
    const card = `
    <div class="card text-bg-light my-2 mx-2 col-lg-4 col-md-5 col-sm-12">
    <div class="card-title fs-6 mt-2">
        ${jogo.titulo}
    </div>
    <img src="${jogo.imagemCapa}" class="mt-1 mx-auto card-img-top"
        style="border-radius: 8px;">
    <div class="card-body">
        <p class="card-text text-center ">${jogo.descricao}</p>

        <p class="card-tex text-secondary mb-0">Plataforma:</p>
        <p class="card-subtitle text-secondary categorias">${jogo.categoria}</p>
        <p class="card-tex text-secondary mt-1 mb-0">Categoria:</p>
        <p class="card-subtitle text-secondary categorias">${jogo.categoria}</p>
        <p class="card-text text-center mb-1">Preço</p>
        <h4><span class="badge text-bg-primary d-flex justify-content-center">${jogo.precoPontos}</span></h4>
    </div >
        <div class="card-footer d-flex justify-content-around">
            <a href="#" class="btn btn-success col-3" title="Adicionar ao carrinho">
                <i class="bi bi-check2"></i>
            </a>
            <a href="#" class="btn btn-danger col-3" title="Excluir do carrinho" onclick="apagar()">
                <i class="bi bi-trash3"></i>
            </a>
        </div>
    </div >
    `

    return card
}