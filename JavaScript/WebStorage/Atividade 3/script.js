const formulario = document.getElementById("produtoForm");
const listaProdutos = document.getElementById("listaProdutos");
const limparTudo = document.getElementById("limparTudo");

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];


// Salvar produtos no localStorage
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}


// Mostrar os produtos na tela
function mostrarProdutos() {

    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {

        listaProdutos.innerHTML = `
            <div class="mensagem-vazia">
                Nenhum produto cadastrado.
            </div>
        `;

        return;
    }

    produtos.forEach((produto, indice) => {

        const valorDesconto =
            produto.preco * (produto.desconto / 100);

        const precoFinal =
            produto.preco - valorDesconto;

        const item = document.createElement("div");

        item.classList.add("produto");

        item.innerHTML = `
            <h3>${produto.nome}</h3>

            <p>
                <strong>Preço original:</strong>
                <span class="preco-original">
                    R$ ${produto.preco.toFixed(2)}
                </span>
            </p>

            <p class="desconto">
                Desconto aplicado: ${produto.desconto}%
            </p>

            <p>
                <strong>Valor do desconto:</strong>
                R$ ${valorDesconto.toFixed(2)}
            </p>

            <p>
                <strong>Preço final:</strong>
                <span class="preco-final">
                    R$ ${precoFinal.toFixed(2)}
                </span>
            </p>

            <div class="acoes">
                <button
                    class="btn-excluir"
                    onclick="excluirProduto(${indice})"
                >
                    Excluir produto
                </button>
            </div>
        `;

        listaProdutos.appendChild(item);
    });
}


// Cadastrar novo produto
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const preco = parseFloat(
        document.getElementById("preco").value
    );

    const desconto = parseFloat(
        document.getElementById("desconto").value
    );

    if (nome === "" || isNaN(preco) || isNaN(desconto)) {

        alert("Preencha todos os campos corretamente.");

        return;
    }

    const novoProduto = {
        nome: nome,
        preco: preco,
        desconto: desconto
    };

    produtos.push(novoProduto);

    salvarProdutos();

    mostrarProdutos();

    formulario.reset();

    document.getElementById("desconto").value = 0;

    alert("Produto cadastrado com sucesso!");
});


// Excluir produto
function excluirProduto(indice) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) {
        return;
    }

    produtos.splice(indice, 1);

    salvarProdutos();

    mostrarProdutos();
}


// Limpar todos os produtos
limparTudo.addEventListener("click", function() {

    if (produtos.length === 0) {
        alert("Não existem produtos cadastrados.");
        return;
    }

    const confirmar = confirm(
        "Deseja realmente excluir todos os produtos?"
    );

    if (!confirmar) {
        return;
    }

    produtos = [];

    salvarProdutos();

    mostrarProdutos();
});


// Recuperar produtos automaticamente
// quando a página for aberta
mostrarProdutos();