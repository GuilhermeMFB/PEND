// ===== SELEÇÃO DOS ELEMENTOS =====
// Aqui você pega todos os elementos do HTML que vai usar no JS.
// Isso permite manipular inputs, mensagens e botões dinamicamente.

let botaoCadastrar = document.querySelector("#cadastrar");
let msgButton = document.querySelector("#msgButton");

let nome = document.querySelector("#nome");
let msgNome = document.querySelector("#msgNome");

let email = document.querySelector("#email");
let msgEmail = document.querySelector("#msgEmail");

let senha = document.querySelector("#senha");
let msgSenha = document.querySelector("#msgSenha");

let confirmarSenha = document.querySelector("#confirmarSenha");
let msgConfirmarSenha = document.querySelector("#msgConfirmarSenha");

let telefone = document.querySelector("#telefone");
let msgTelefone = document.querySelector("#msgTelefone");

let endereco = document.querySelector("#endereco");
let msgEndereco = document.querySelector("#msgEndereco");

let plus = document.querySelector("#plus");
let lista = document.querySelector("#lista");

let eye = document.querySelector("#eye");
let eyeConfirmar = document.querySelector("#eyeConfirmar");

// Regex usada pra validar o formato do email
let mascara = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// ===== VALIDAÇÃO DE SENHA =====
// Função que classifica a força da senha baseado no tamanho.
// Você já dá um feedback visual pro usuário (fraca, aceitável ou forte).

function validarSenha(senha) {
    let tamanho = senha.trim().length;

    if (tamanho < 6) {
        msgSenha.style.color = "red";
        msgSenha.textContent = "Senha fraca!";
    } else if (tamanho <= 10) {
        msgSenha.style.color = "orange";
        msgSenha.textContent = "Senha aceitável";
    } else {
        msgSenha.style.color = "green";
        msgSenha.textContent = "Senha forte";
    }
}


// ===== VALIDAÇÕES EM TEMPO REAL =====
// Aqui você usa eventos (keyup) pra validar enquanto o usuário digita.

// Validação de email com regex
email.addEventListener('keyup', function () {
    if (!mascara.test(email.value)) {
        msgEmail.style.color = "red";
        msgEmail.textContent = "Email inválido!";
    } else {
        msgEmail.style.color = "green";
        msgEmail.textContent = "Email valido!";
    }
});

// Validação de força da senha
senha.addEventListener('keyup', function () {
    validarSenha(senha.value);
});

// Validação simples de telefone (11 dígitos)
telefone.addEventListener('keyup', function () {
    if (telefone.value.length === 11) {
        msgTelefone.style.color = "green";
        msgTelefone.textContent = "Telefone válido!";
    } else {
        msgTelefone.style.color = "red";
        msgTelefone.textContent = "Telefone inválido!";
    }
});

// Confirmação de senha
confirmarSenha.addEventListener('keyup', function () {
    if (senha.value === confirmarSenha.value) {
        msgConfirmarSenha.style.color = "green";
        msgConfirmarSenha.textContent = "Senha confirmada!";
    } else {
        msgConfirmarSenha.style.color = "red";
        msgConfirmarSenha.textContent = "Senha não confirmada!";
    }
});


// ===== AÇÃO DO BOTÃO CADASTRAR =====
// Aqui você faz a validação final antes de "aceitar" o cadastro.

botaoCadastrar.addEventListener('click', function () {

    // Verifica se algum campo está vazio
    if (nome.value === "" || email.value === "" || senha.value === "" || confirmarSenha.value === "" || telefone.value === "" || endereco.value === "") {
        msgButton.style.color = "red";
        msgButton.textContent = "Preencha todos os campos!";
    }

    // Verifica se algum campo está inválido
    else if (
        msgEmail.textContent === "Email inválido!" ||
        msgSenha.textContent === "Senha fraca!" ||
        msgTelefone.textContent === "Telefone inválido!" ||
        msgConfirmarSenha.textContent === "Senha não confirmada!"
    ) {
        msgButton.style.color = "red";
        msgButton.textContent = "Preencha os campos corretamente!";
    }

    // Se tudo estiver certo
    else {
        msgButton.style.color = "green";
        msgButton.textContent = "Cadastro realizado com sucesso!";
    }
});


// ===== ADICIONAR TELEFONES DINAMICAMENTE =====
// Permite adicionar vários telefones na lista.

plus.addEventListener('click', function () {
    let novoTelefone = document.createElement("li");
    let inputTelefone = document.createElement("input");
    let menos = document.createElement("i");

    inputTelefone.type = "text";
    inputTelefone.placeholder = "Digite outro telefone";
    inputTelefone.classList.add("input");

    menos.classList.add("bi", "bi-x-circle", "excluir-icon");

    novoTelefone.appendChild(inputTelefone);
    novoTelefone.appendChild(menos);
    lista.appendChild(novoTelefone);

    // Função pra remover o telefone da lista
    menos.addEventListener('click', function () {
        lista.removeChild(novoTelefone);
    });
});


// ===== MOSTRAR / ESCONDER SENHA =====
// Alterna entre "password" e "text" ao clicar no ícone de olho.

// Senha principal
eye.addEventListener('click', function () {
    if (senha.type === "password") {
        senha.type = "text";
        eye.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
    } else {
        senha.type = "password";
        eye.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
    }
});

// Confirmar senha
eyeConfirmar.addEventListener('click', function () {
    if (confirmarSenha.type === "password") {
        confirmarSenha.type = "text";
        eyeConfirmar.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
    } else {
        confirmarSenha.type = "password";
        eyeConfirmar.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
    }
});