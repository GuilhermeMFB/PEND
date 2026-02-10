function saudacao() { // Função sem retorno e sem parametro 
    console.log("Olá, JavaScript!");
}
saudacao();
function saudacaonome(nome) { // Função com parametro mas sem retorno
    console.log("Olá, " + nome);
}
saudacaonome("Ana");

function somar(a, b) { // Função com parametro e retorno
    return a + b;
}
console.log(somar(5, 3));

// atividade
function imc(peso, altura) {
    return peso / (altura * altura);
}

console.log(imc(90, 1.90));

function imparpar(num) {
    if (num % 2 === 0) {
        return "Par";
    } else {
        return "Ímpar";
    }
}
console.log(imparpar(9));

console.log("******************FUNÇÕES NATIVAS******************");

let agora = new Date();
console.log(agora);

function mostrarDataHora() {
  let data = new Date();

  console.log("Dia:", data.getDate());
  console.log("Mês:", data.getMonth() + 1);
  console.log("Ano:", data.getFullYear());
  console.log("Hora:", data.getHours());
  console.log("Minutos:", data.getMinutes());

  console.log(
    data.getHours().toString().padStart(2, "0") + ":" +
    data.getMinutes().toString().padStart(2, "0") + ":" +
    data.getSeconds().toString().padStart(2, "0") +
    " - " +
    data.getDate().toString().padStart(2, "0") + "/" +
    (data.getMonth() + 1).toString().padStart(2, "0") + "/" +
    data.getFullYear()
  );
}

mostrarDataHora();
console.log(Math.PI);

function calcularOperacoes(numero) {
    console.log("Raiz:", Math.sqrt(numero));
    console.log("Arredondado:", Math.round(numero));
    console.log("Para cima:", Math.ceil(numero));
    console.log("Para baixo:", Math.floor(numero));
    console.log("Quadrado:", Math.pow(numero, 2));
    console.log("Absoluto:", Math.abs(numero))
}
calcularOperacoes(7.8)

console.log("************** Funções string **************");
function analisartexto(texto) {
    console.log("Tamanho:", texto.length);
    console.log("Maíusculo:", texto.toUpperCase());
    console.log("Minúsculo:", texto.toLowerCase());
}
analisartexto("JavaScript");

function oQueFazEssaFuncao(frase) {
    console.log(frase.includes("JavaScript"));
}
oQueFazEssaFuncao("Eu estudo JavaScript");

function eEssaAqui(nome, curso) {
    return "Aluno: " + nome + " | Curso: " + curso;
}
console.log(eEssaAqui("José", "Front-End"));

console.log("*************** Atividades ***************");

function mostrarHoraAtual() {
  let agora = new Date();

  console.log(
    "Hora atual:",
    agora.getHours().toString().padStart(2, "0") + ":" +
    agora.getMinutes().toString().padStart(2, "0") + ":" +
    agora.getSeconds().toString().padStart(2, "0")
  );
}

function somaEMedia(num1, num2) {
  let soma = num1 + num2;
  let media = soma / 2;

  console.log("Soma:", soma);
  console.log("Média:", media);
}

function analisarNome(nome) {
  console.log("Quantidade de letras:", nome.length);
  console.log("Nome em maiúsculo:", nome.toUpperCase());
}

function verificarHTML(frase) {
  if (frase.includes("HTML")) {
    console.log('A frase contém a palavra "HTML"');
  } else {
    console.log('A frase NÃO contém a palavra "HTML"');
  }
}

// Chamadas das funções
mostrarHoraAtual();
somaEMedia(10, 20);
analisarNome("Guilherme");
verificarHTML("Estou estudando HTML e CSS");


