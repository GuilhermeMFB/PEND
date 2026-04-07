document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const botao = document.getElementById('cadastrar');
    const mensagem = document.getElementById('mensagem');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const confirmaSenhaInput = document.getElementById('confirmasenha');
    const togglePassword = document.getElementById('toggle-password');
    const eyeIcon = togglePassword.querySelector('.eye-icon');
    const emailError = document.getElementById('email-error');
    const confirmError = document.getElementById('confirm-error');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const nomeInput = document.getElementById('nome');
    const listaContainer = document.getElementById('listaContainer');
    const listaUsuarios = document.getElementById('listaUsuarios');

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    atualizarLista();

    // Toggle senha - 1 ÚNICO ÍCONE que MUDA
    togglePassword.addEventListener('click', function() {
        if (senhaInput.type === 'password') {
            // Mostrar senha
            senhaInput.type = 'text';
            eyeIcon.textContent = 'visibility';
        } else {
            // Ocultar senha
            senhaInput.type = 'password';
            eyeIcon.textContent = 'visibility_off';
        }
    });

    // Validação email
    emailInput.addEventListener('input', function() {
        const email = emailInput.value;
        if (email && (!email.includes('@') || !email.includes('.'))) {
            emailError.textContent = 'Email deve conter @ e .';
            emailError.classList.add('show');
        } else {
            emailError.classList.remove('show');
        }
    });

    // Força da senha
    senhaInput.addEventListener('input', function() {
        const senha = senhaInput.value;
        const comprimento = senha.length;
        
        if (comprimento === 0) {
            strengthBar.style.width = '0%';
            strengthText.textContent = '';
            return;
        }
        
        let cor, texto, largura;
        if (comprimento < 6) {
            cor = '#ff6b6b';
            texto = 'Senha fraca';
            largura = '30%';
        } else if (comprimento <= 8) {
            cor = '#feca57';
            texto = 'Aceitável';
            largura = '60%';
        } else {
            cor = '#2ecc71';
            texto = 'Senha forte';
            largura = '100%';
        }
        
        strengthBar.style.background = cor;
        strengthBar.style.width = largura;
        strengthText.textContent = texto;
    });

    // Confirmação senha
    confirmaSenhaInput.addEventListener('input', function() {
        if (confirmaSenhaInput.value && confirmaSenhaInput.value !== senhaInput.value) {
            confirmError.textContent = 'Senhas não coincidem';
            confirmError.classList.add('show');
        } else {
            confirmError.classList.remove('show');
        }
    });

    // Cadastro
    botao.addEventListener('click', function() {
        const nome = nomeInput.value.trim();
        const email = emailInput.value;
        const senha = senhaInput.value;
        const confirmaSenha = confirmaSenhaInput.value;
        
        if (!nome) {
            mostrarMensagem('Preencha o nome!', 'error');
            return;
        }
        
        if (!email || !email.includes('@') || !email.includes('.')) {
            mostrarMensagem('Email inválido!', 'error');
            return;
        }
        
        if (senha.length < 6) {
            mostrarMensagem('Senha deve ter pelo menos 6 caracteres!', 'error');
            return;
        }
        
        if (senha !== confirmaSenha) {
            mostrarMensagem('Senhas não coincidem!', 'error');
            return;
        }
        
        // Adicionar usuário
        const usuario = { nome, email, senha };
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        mostrarMensagem('Cadastrado com sucesso! ✅', 'success');
        atualizarLista();
        
        // Reset form
        document.getElementById('formCadastro').reset();
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
        emailError.classList.remove('show');
        confirmError.classList.remove('show');
        // Reset olhinho
        senhaInput.type = 'password';
        eyeIcon.textContent = 'visibility_off';
    });

    function atualizarLista() {
        listaUsuarios.innerHTML = '';
        if (usuarios.length === 0) {
            listaUsuarios.innerHTML = '<li style="text-align: center; color: #a0a0b0;">Nenhum usuário cadastrado</li>';
            listaContainer.style.display = 'none';
            return;
        }
        
        usuarios.forEach((usuario, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${usuario.nome}</strong><br>
                <small>${usuario.email}</small>
            `;
            listaUsuarios.appendChild(li);
        });
        
        listaContainer.style.display = 'block';
    }

    function mostrarMensagem(texto, tipo) {
        mensagem.textContent = texto;
        mensagem.className = `show ${tipo}`;
        setTimeout(() => mensagem.classList.remove('show'), 3000);
    }
});