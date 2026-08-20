const nome = document.querySelector('#nome');
const botaoSalvar = document.querySelector('#salvar');
const botaoRecuperar = document.querySelector('#recuperar');
const botaoExcluir = document.querySelector('#Excluir');

const resultado = document.querySelector('#resultado');

//Salvar
botaoSalvar.addEventListener('click', function () {

    localStorage.setItem('nome', nome.value);

    resultado.textContent = "Nome salvo!";
});

//Recuperar
botaoRecuperar.addEventListener('click', function () {
    const nomeRecuperado = localStorage.getItem("nome");

    resultado.textContent = `Nome recuperado: ${nomeRecuperado}`;
});

//Excluir
botaoExcluir.addEventListener('click', function () {
    localStorage.removeItem("nome");

    resultado.textContent = "Nome excluído!";
});