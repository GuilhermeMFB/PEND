console.log("Operadores e funções em JavaScript");
let a = 10;
let b = 3;

console.log("Adição:", a + b); // Adição
console.log("Subtração:", a - b); // Subtração 
console.log("Multiplicação:", a * b); // Multiplicação
console.log("Divisão:", a / b); // Divisão
console.log("Resto de divisão:", a % b); // Resto da divisão
console.log("Potenciação:",a ** b); // Potenciação

let contador = 5;
contador++; // Incremento
console.log(contador); // contador = contador + 2

let v = 15;
let d = 10;
let c = 5;
let media = (v + d + c) / 3;
console.log("Media:", media);
let restdiv = v % d;
console.log("Resto da divisão:", restdiv);

let x = 10;
let y = "10";
console.log("Igual (valor) ==:", x == y);
console.log("Igual (valor e tipo) ===:",x === y);
console.log("Maior ou igual !=:",x != y);
console.log("Menor ou igual !==:",x !== y);

let f = 20;
let g = 10;
console.log("Maior que >:", f > g);
console.log("Menor que <:", f < g);
console.log("Maior ou igual a >=:", f >= g);
console.log("Menor ou igual a <=:", f <= g);

// Exercício
let idade2 = 17;
if (idade2 >= 18) {
    console.log("Você é maior de idade.");
} else {
        console.log("Você é menor de idade.");
    }

let num1 = 1;
let num2 = 10;
if (num1 > num2) {
    console.log("O primeiro numero é maior");
}
    if (num1 == num2) {
        console.log("Os números são iguais");
    } 
    else if (num1 < num2) {
        console.log("O segundo numero é maior!");
    }
// Fim exercicios
console.log("op.lógicos");
let idade = 20;
let temCarteira = true;
console.log(idade >= 18 && temCarteira);

let chovendo = false;
let guardaChuva = true;
console.log (chovendo || guardaChuva);

let ligado = false;
console.log(!ligado); //true

let nota = 7;
let freq = 80;
if (nota >= 7 && freq >= 75) {
    console.log("Você esta aprovado!");
} else {
    console.log("Você esta reprovado!")
}

let login = false;
let token = true  ;
if (login || token) {
    console.log("Você pode acessar!!")
} else {
    console.log("Você não pode acessar!!")
}