class Produto {
    constructor(nome, preco, categoria, desconto) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.desconto = desconto;
    }

    aplicarDesconto() {
        return this.preco - (this.preco * this.desconto / 100);
    }

    exibir() {
        const precoFinal = this.aplicarDesconto();

        return `
            <strong>Nome:</strong> ${this.nome}<br>
            <strong>Preço original:</strong> R$ ${this.preco.toFixed(2)}<br>
            <strong>Categoria:</strong> ${this.categoria}<br>
            <strong>Desconto:</strong> ${this.desconto.toFixed(2)}%<br>
            <strong>Preço com desconto:</strong> R$ ${precoFinal.toFixed(2)}
        `;
    }
}

const form = document.getElementById("formProduto");
const resultado = document.getElementById("resultado");
const dadosProduto = document.getElementById("dadosProduto");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const preco = Number(document.getElementById("preco").value);
    const categoria = document.getElementById("categoria").value.trim();
    const desconto = Number(document.getElementById("desconto").value);

    if (!nome || !categoria || preco <= 0 || desconto < 0 || desconto > 100) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const produto = new Produto(nome, preco, categoria, desconto);

    dadosProduto.innerHTML = produto.exibir();
    resultado.classList.add("mostrar");

    form.reset();
});
