let titulo = document.querySelector("#titulo");
let azul = document.querySelector("#azul");
let vermelho = document.querySelector("#vermelho");

azul.addEventListener("click", function() {
  titulo.style.color = "blue";
});

vermelho.addEventListener("click", function() {
  titulo.style.color = "red";
});

//---------------------------------------------------------

let mensagem = document.querySelector("#mensagem");

mostrar.addEventListener("click", function() {
  mensagem.style.display = "block";
});

esconder.addEventListener("click", function() {
  mensagem.style.display = "none";
});

//---------------------------------------------------------

let texto = document.querySelector("#campoTexto");
let contador = document.querySelector("#contador");

texto.addEventListener("keyup", function() {
  let quantidade = texto.value.length;
  contador.textContent = "Caracteres digitados: " + quantidade;
});

//---------------------------------------------------------