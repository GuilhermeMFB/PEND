class Produto {

    constructor(nome, preco, categoria, desconto) {

        this.nome = nome;
        this.preco = Number(preco);
        this.categoria = categoria;
        this.desconto = Number(desconto);
    }

    aplicarDesconto() {
        this.preco = this.preco - (this.preco * this.desconto / 100);
    }
}


class Gerente {

    constructor() {
        this.Gerente = [];

        // Recupera os produtos salvos no localStorage
        this.carregarProdutos();
    }

    adicionarProduto(produto) {

        produto.aplicarDesconto();

        this.Gerente.push(produto);

        // Salva os produtos atualizados
        this.salvarProdutos();
    }

    excluirProduto(indice) {

        // Remove o produto da lista
        this.Gerente.splice(indice, 1);

        // Atualiza o localStorage
        this.salvarProdutos();

        // Atualiza a tela
        this.exibirNaTela();
    }

    salvarProdutos() {

        localStorage.setItem(
            "produtos",
            JSON.stringify(this.Gerente)
        );
    }

    carregarProdutos() {

        const produtosSalvos = localStorage.getItem("produtos");

        if (produtosSalvos) {

            this.Gerente = JSON.parse(produtosSalvos);

        }

        this.exibirNaTela();
    }

    exibirNaTela() {

        const resultado = document.querySelector("#resultado");

        resultado.innerHTML = "";

        this.Gerente.forEach((produto, indice) => {

            resultado.innerHTML += `
            <div>

                <p>Nome: ${produto.nome}</p>

                <p>Preço: R$ ${Number(produto.preco).toFixed(2)}</p>

                <p>Categoria: ${produto.categoria}</p>

                <p>Desconto: ${produto.desconto}%</p>

                <button onclick="gerente.excluirProduto(${indice})">
                    Excluir
                </button>

                <hr>

            </div>
            `;

        });
    }
}


const gerente = new Gerente();

const nome = document.querySelector("#nome");
const preco = document.querySelector("#preco");
const categoria = document.querySelector("#categoria");
const desconto = document.querySelector("#desconto");

const botaoCadastrar = document.querySelector("#botaoCadastrar");


botaoCadastrar.addEventListener("click", function () {

    const produto = new Produto(
        nome.value,
        preco.value,
        categoria.value,
        desconto.value
    );

    gerente.adicionarProduto(produto);

    gerente.exibirNaTela();

});