function alteraTituloFiltro(jogos){

    let disabled = jogos.length

    if (disabled  == 0) {
        document.querySelector("#titulo__pagina").innerHTML = "Nenhum jogo em estoque, cadastre um jogo"
    } else if (disabled >= 1){
        document.querySelector("#titulo__pagina").innerHTML = "Controle de Estoque de jogos"
    }
}

document.querySelector("#diponivel_filtro").addEventListener("click", () =>{
    let estoqueFiltradoDisponivel = jogos.filter(jogo => jogo.disponivel)
    filtrar(estoqueFiltradoDisponivel)
    document.querySelector("#titulo__pagina").innerHTML = "Jogos disponíveis em estoque"
})

document.querySelector("#naoDisponivel_filtro").addEventListener("click", () =>{
    let estoqueFiltradoIndisponivel = jogos.filter(jogo => !jogo.disponivel)
    filtrar(estoqueFiltradoIndisponivel)
    document.querySelector("#titulo__pagina").innerHTML = "Jogos indisponíveis em estoque"
})
