class Aluno {

    constructor(nome, idade, notas) {

        this.nome = nome;
        this.idade = idade;
        this.notas = notas;
    }

    estudo() {
        console.log("Aluno está estudando");
}

    presenca() {
        console.log("Aluno está presente");
}
    falta() {
        console.log("Aluno está ausente");
    }

}

const aluno1 = new Aluno("Guilherme", 17, [10, 9, 8]);
const aluno2 = new Aluno("Vinicius", 17, [7, 6, 5]);

console.log("-------------------------------");
console.log("atributos do aluno 1: ");
console.log("- ", aluno1.nome);
console.log("- ", aluno1.idade);
console.log("- ", aluno1.notas);
console.log("-------------------------------");

console.log("-------------------------------");
console.log("atributos do aluno 2: ");
console.log("- ", aluno2.nome);
console.log("- ", aluno2.idade);
console.log("- ", aluno2.notas);
console.log("-------------------------------");

aluno1.estudo();

aluno2.presenca();