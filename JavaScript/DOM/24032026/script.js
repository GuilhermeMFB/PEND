function validarEmail() {
    const email = document.getElementById('emailInput').value;
    const mensagemErro = document.getElementById('mensagemErro');
    const mensagemSucesso = document.getElementById('mensagemSucesso');
    
    mensagemErro.style.display = 'none';
    mensagemSucesso.style.display = 'none';
    
    if (!email.includes('@') || !email.includes('.')) {
        mensagemErro.style.display = 'block';
        return;
    }
    
    mensagemSucesso.style.display = 'block';
}

function verificarForca() {
    const senha = document.getElementById('senhaInput').value;
    const forcaDiv = document.getElementById('forcaSenha');
    const tamanho = senha.length;
    
    forcaDiv.innerHTML = '';
    
    if (tamanho < 6) {
        forcaDiv.innerHTML = 'Senha fraca';
        forcaDiv.style.color = 'red';
    } else if (tamanho <= 10) {
        forcaDiv.innerHTML = 'Senha aceitável';
        forcaDiv.style.color = 'orange';
    } else {
        forcaDiv.innerHTML = 'Senha forte';
        forcaDiv.style.color = 'green';
    }
}