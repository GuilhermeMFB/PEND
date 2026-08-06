class Produto {

    constructor(nome, preco, estoque) {

        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }   

    vender() {
        console.log("Produto vendido");
    }

    repor() {
        console.log("Produto reposto");
    }

    alterarPreco() {
        console.log("Preço do produto alterado");
    }

}

const produto1 = new Produto("Arroz", 20, 30);
const produto2 = new Produto("Feijão", 15, 30);
const produto3 = new Produto("Macarrão", 5, 30);

console.log("-------------------------------");
console.log("atributos do produto 1: ");
console.log("- ", produto1.nome);
console.log("- ", produto1.preco);
console.log("- ", produto1.estoque);
console.log("-------------------------------");

console.log("-------------------------------");
console.log("atributos do produto 2: ");
console.log("- ", produto2.nome);
console.log("- ", produto2.preco);
console.log("- ", produto2.estoque);
console.log("-------------------------------");

console.log("-------------------------------");
console.log("atributos do produto 3: ");
console.log("- ", produto3.nome);
console.log("- ", produto3.preco);
console.log("- ", produto3.estoque);
console.log("-------------------------------");

produto1.vender();

produto2.repor();

produto3.alterarPreco();