console.log("Olá, JavaScript!");

let a = 10;
let b = 3;

console.log("adição: " + (a + b));
console.log("subtração: " + (a - b));
console.log("multiplicação: " + (a * b));
console.log("divisão: " + (a / b));
console.log("resto da divisão: " + (a % b));
console.log("potência: " + (a ** b));

let contador = 5;
contador++;
console.log (contador);

////////////////////////////////////////////////////

let num1 = 7;
let num2 = 8;
let num3 = 9;
let media = (num1 + num2 + num3) / 3;
console.log ("A média é: " + media);

let dividendo = 29;
let divisor = 5;
let resto = dividendo % divisor;
console.log ("O resto da divisão é: " + resto);

/////////////////////////////////////////////////////

let x = 10;
let y = "10";
console.log (x == y);      // true
console.log (x === y);
console.log (x != y);      // false
console.log (x !== y);

//////////////////////////////////////////////////////

let idade = 17;
let maiorDeIdade = idade >= 18;
if (idade >= 18) {
    console.log ("É maior de idade.");
} else {
    console.log ("É menor de idade.");
}

//////////////////////////////////////////////////////

let numero1 = 15;
let numero2 = 25;
let maiorNumero = numero1 > numero2 ? numero1 : numero2;
console.log("O maior número é: " + maiorNumero);

//////////////////////////////////////////////////////

console.log("op.lógicos:");
let idade2 = 20;
let temCarteira = true;
console.log(idade2 >= 18 && temCarteira); // true

let chovendo = false;
let guardaChuva = true;
console.log(chovendo || guardaChuva); // true

let ligado = false;
console.log(!ligado); // true

//////////////////////////////////////////////////////

let nota1 = 8;5;
let nota2 = 7.5;
let nota3 = 9.0;
let mediaFinal = (nota1 + nota2 + nota3) / 3;
if (mediaFinal >= 7) {
    console.log("Aprovado com média: " + mediaFinal);
} else {
    console.log("Reprovado com média: " + mediaFinal);
}

//////////////////////////////////////////////////////

let login = "true"
let token = false
if (login === true || token == true) {
    console.log("Acesso permitido");
} else {
    console.log("Acesso negado");
}