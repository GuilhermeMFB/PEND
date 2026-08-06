//classe
class Carro {

    constructor(marca, modelo, ano, cor) {

        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;

    }

    ligar() {
    console.log("Carro ligado");
}

acelerar() {
    console.log("Carro acelerando");
}

frear() {
    console.log(`${this.modelo} freiou.`);
}

}

const carro1 = new Carro("volkswagen", "gol", 2022, "Branco");
//console.log("Carro 1", carro1);

const carro2 = new Carro("toyota", "Corolla", 2025, "preto");
//console.log("Carro 2", carro2);

console.log("-------------------------------");
console.log("atributos do Carro 1: ");
console.log("- ", carro1.marca);
console.log("- ", carro1.modelo);
console.log("- ", carro1.ano); 
console.log("- ", carro1.cor);
console.log("-------------------------------");

console.log("-------------------------------");
console.log("atributos do Carro 2: ");
console.log("- ", carro2.marca);
console.log("- ", carro2.modelo);
console.log("- ", carro2.ano);
console.log("- ", carro2.cor);
console.log("-------------------------------");


carro1.ligar();

carro2.acelerar();
