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

//---------------------------------------------------------
// Atividade 2 - Mostrar e esconder mensagem
let mensagem = document.querySelector("#mensagem");
let toggleMensagem = document.querySelector("#toggleMensagem");

toggleMensagem.addEventListener("click", function() {
  // Verifica se a mensagem está visível
  if (mensagem.style.display === "block") {
    mensagem.style.display = "none"; // Esconde
  } else {
    mensagem.style.display = "block"; // Mostra
  }
});

//---------------------------------------------------------

let texto = document.querySelector("#campoTexto");
let contador = document.querySelector("#contador");

texto.addEventListener("keyup", function() {
  let quantidade = texto.value.length;
  contador.textContent = "Caracteres digitados: " + quantidade;
});

//---------------------------------------------------------

//---------------------------------------------------------
// Atividade 4 - Contador
let btnContador = document.querySelector("#btnContador");
let valorContador = document.querySelector("#valorContador");
let contagem = 0;

btnContador.addEventListener("click", function() {
  contagem++;
  valorContador.textContent = contagem;
});

//---------------------------------------------------------
// Atividade 5 - Criar elementos dinamicamente
let novoItem = document.querySelector("#novoItem");
let btnAdicionar = document.querySelector("#btnAdicionar");
let listaItens = document.querySelector("#listaItens");

btnAdicionar.addEventListener("click", function() {
  let texto = novoItem.value;
  
  if (texto.trim() !== "") {
    let novoItemLista = document.createElement("li");
    novoItemLista.textContent = texto;
    listaItens.appendChild(novoItemLista);
    
    novoItem.value = ""; // Limpar o input após adicionar
  }
});

//---------------------------------------------------------
// Atividade 6 - Remover elemento ao clicar
listaItens.addEventListener("click", function(event) {
  // Verifica se o elemento clicado é um item da lista (li)
  if (event.target.tagName === "LI") {
    event.target.remove(); // Remove o elemento clicado
  }
});

//---------------------------------------------------------
// Desafio Extra - Confirmar remoção
listaItens.addEventListener("click", function(event) {
  // Verifica se o clique foi em um item da lista (li)
  if (event.target.tagName === "LI") {
    // Pede confirmação ao usuário
    let confirmacao = confirm("Tem certeza que deseja remover este item?");
    
    // Se o usuário clicar em "OK", remove o item
    if (confirmacao) {
      event.target.remove();
    }
  }
});

//---------------------------------------------------------
// Desafio HARD! - Validação de Campo
let campoNome = document.querySelector("#campoNome");
let btnEnviar = document.querySelector("#btnEnviar");
let mensagemValidacao = document.querySelector("#mensagemValidacao");

btnEnviar.addEventListener("click", function() {
  let nome = campoNome.value.trim();
  
  if (nome === "") {
    // Campo vazio - mensagem em vermelho
    mensagemValidacao.textContent = "O campo nome é obrigatório";
    mensagemValidacao.style.color = "red";
  } else {
    // Campo preenchido - mensagem em verde
    mensagemValidacao.textContent = "Nome enviado com sucesso!";
    mensagemValidacao.style.color = "green";
  }
});

//---------------------------------------------------------
// Exercícios - Validação de Campos (E-mail)
let email = document.querySelector("#email");
let btnValidar = document.querySelector("#btnValidar");
let msgEmail = document.querySelector("#msgEmail");

btnValidar.addEventListener("click", function() {
  let valor = email.value;

  // Verifica se tem @ E se tem .
  if (valor.includes("@") && valor.includes(".")) {
    msgEmail.textContent = "E-mail válido!";
    msgEmail.style.color = "green";
  } else {
    msgEmail.textContent = "Erro: E-mail inválido (precisa de @ e .)";
    msgEmail.style.color = "red";
  }
});

//---------------------------------------------------------
// Verificação de Força de Senha
let senha = document.querySelector("#senha");
let msgSenha = document.querySelector("#msgSenha");

senha.addEventListener("keyup", function() {
  let valor = senha.value;

  if (valor.length < 6) {
    msgSenha.textContent = "Senha fraca";
    msgSenha.style.color = "red";
  } else {
    msgSenha.textContent = "Senha aceitável";
    msgSenha.style.color = "green";
  }
});