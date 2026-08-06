//Objeto: Pessoa
//Atributo: nome, idade, sexo
//Metodos: falar, andar, correr

class Pessoa {
    constructor(nome, idade, sexo) {
        this.nome = nome;
        this.idade = idade;
        this.sexo = sexo;
    }

    falar() {
        console.log(`${this.nome} está falando.`);
    }

    andar() {
        console.log(`${this.nome} está andando.`);
    }

    correr() {
        console.log(`${this.nome} está correndo.`);
    }
}

const pessoa1 = new Pessoa("Guilherme", 17, "Masculino");
const pessoa2 = new Pessoa("Vinicius", 17, "Masculino");

console.log("-------------------------------");
console.log("atributos da pessoa 1: ");
console.log("- ", pessoa1.nome);
console.log("- ", pessoa1.idade);
console.log("- ", pessoa1.sexo);
console.log("-------------------------------");

console.log("-------------------------------");
console.log("atributos da pessoa 2: ");
console.log("- ", pessoa2.nome);
console.log("- ", pessoa2.idade);
console.log("- ", pessoa2.sexo);
console.log("-------------------------------");