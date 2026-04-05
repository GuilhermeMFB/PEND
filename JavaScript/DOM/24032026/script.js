// ==============================================
// script.js — TechConnect Cadastro
// Validação em tempo real, força de senha,
// olhinho, telefones dinâmicos, múltiplos
// cadastros com listagem e exclusão.
// ==============================================

// Array que armazena todos os cadastros realizados
const listaCadastros = [];


// ─── 1. REFERÊNCIAS AOS ELEMENTOS DO DOM ──────
const form             = document.getElementById('formCadastro');
const inputNome        = document.getElementById('nome');
const inputEmail       = document.getElementById('email');
const inputSenha       = document.getElementById('senha');
const inputConfirmar   = document.getElementById('confirmar-senha');
const inputEndereco    = document.getElementById('endereco');
const divTelefones     = document.getElementById('telefones');
const btnAddTelefone   = document.getElementById('add-telefone');
const mensagemFinal    = document.getElementById('mensagem');
const barraForca       = document.getElementById('barra-forca');
const forcaTexto       = document.getElementById('forca-texto');
const olhinho          = document.getElementById('olhinho');
const olhinhoConfirmar = document.getElementById('olhinho-confirmar');


// ─── 2. TELEFONES DINÂMICOS ───────────────────

function adicionarTelefone() {
    const linha = document.createElement('div');
    linha.className = 'telefone-linha';

    const input = document.createElement('input');
    input.type = 'tel';
    input.placeholder = '(00) 00000-0000';
    input.autocomplete = 'tel';

    input.addEventListener('input', () => {
        input.value = mascaraTelefone(input.value);
        validarTelefones();
    });

    const btnRemover = document.createElement('button');
    btnRemover.type = 'button';
    btnRemover.className = 'btn-remover';
    btnRemover.textContent = '−';
    btnRemover.title = 'Remover telefone';
    btnRemover.setAttribute('aria-label', 'Remover este telefone');

    btnRemover.addEventListener('click', () => {
        const totalLinhas = divTelefones.querySelectorAll('.telefone-linha').length;
        if (totalLinhas > 1) {
            linha.remove();
        } else {
            mostrarErro('erro-telefone', 'É necessário pelo menos um telefone.');
        }
    });

    linha.appendChild(input);
    linha.appendChild(btnRemover);
    divTelefones.appendChild(linha);
}

// Inicia com 1 campo de telefone ao carregar a página
adicionarTelefone();

btnAddTelefone.addEventListener('click', adicionarTelefone);


// ─── 3. MÁSCARA DE TELEFONE ───────────────────

function mascaraTelefone(valor) {
    let numeros = valor.replace(/\D/g, '');
    if (numeros.length > 11) numeros = numeros.slice(0, 11);

    if (numeros.length <= 2) {
        return numeros.length ? `(${numeros}` : '';
    } else if (numeros.length <= 7) {
        return `(${numeros.slice(0,2)}) ${numeros.slice(2)}`;
    } else {
        return `(${numeros.slice(0,2)}) ${numeros.slice(2,7)}-${numeros.slice(7)}`;
    }
}


// ─── 4. UTILITÁRIOS DE FEEDBACK ───────────────

function mostrarErro(idSpan, msg) {
    const span = document.getElementById(idSpan);
    if (span) span.textContent = msg;
}

function limparErro(idSpan) {
    const span = document.getElementById(idSpan);
    if (span) span.textContent = '';
}

function marcarInput(input, valido) {
    input.classList.toggle('erro', !valido);
    input.classList.toggle('ok',   valido);
}


// ─── 5. VALIDAÇÕES INDIVIDUAIS ────────────────

function validarNome() {
    const valor = inputNome.value.trim();
    const regex = /^[A-Za-zÀ-ÿ\s]{3,}$/;

    if (valor === '') {
        mostrarErro('erro-nome', 'O nome é obrigatório.');
        marcarInput(inputNome, false);
        return false;
    }
    if (!regex.test(valor)) {
        mostrarErro('erro-nome', 'Use apenas letras (mínimo 3 caracteres).');
        marcarInput(inputNome, false);
        return false;
    }
    limparErro('erro-nome');
    marcarInput(inputNome, true);
    return true;
}

function validarEmail() {
    const valor = inputEmail.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (valor === '') {
        mostrarErro('erro-email', 'O e-mail é obrigatório.');
        marcarInput(inputEmail, false);
        return false;
    }
    if (!regex.test(valor)) {
        mostrarErro('erro-email', 'Informe um e-mail válido (ex: nome@email.com).');
        marcarInput(inputEmail, false);
        return false;
    }
    limparErro('erro-email');
    marcarInput(inputEmail, true);
    return true;
}

function calcularForcaSenha(senha) {
    let pontos = 0;
    if (senha.length >= 8)           pontos++;
    if (senha.length >= 12)          pontos++;
    if (/[A-Z]/.test(senha))         pontos++;
    if (/[0-9]/.test(senha))         pontos++;
    if (/[^A-Za-z0-9]/.test(senha))  pontos++;
    return pontos;
}

function validarSenha() {
    const valor = inputSenha.value;

    if (valor === '') {
        barraForca.className = '';
        barraForca.style.width = '0';
        forcaTexto.textContent = '';
        forcaTexto.style.color = '';
        mostrarErro('erro-senha', 'A senha é obrigatória.');
        marcarInput(inputSenha, false);
        return false;
    }

    if (valor.length < 8) {
        mostrarErro('erro-senha', 'A senha deve ter pelo menos 8 caracteres.');
        marcarInput(inputSenha, false);
    } else {
        limparErro('erro-senha');
        marcarInput(inputSenha, true);
    }

    const pontos = calcularForcaSenha(valor);
    barraForca.className = '';

    if (pontos <= 2) {
        barraForca.classList.add('senha-fraca');
        forcaTexto.textContent = '🔴 Fraca';
        forcaTexto.style.color = '#e53935';
    } else if (pontos <= 3) {
        barraForca.classList.add('senha-media');
        forcaTexto.textContent = '🟠 Média';
        forcaTexto.style.color = '#fb8c00';
    } else {
        barraForca.classList.add('senha-forte');
        forcaTexto.textContent = '🟢 Forte';
        forcaTexto.style.color = '#43a047';
    }

    if (inputConfirmar.value !== '') validarConfirmacao();
    return valor.length >= 8;
}

function validarConfirmacao() {
    const senha    = inputSenha.value;
    const confirma = inputConfirmar.value;

    if (confirma === '') {
        mostrarErro('erro-confirmar', 'Confirme sua senha.');
        marcarInput(inputConfirmar, false);
        return false;
    }
    if (senha !== confirma) {
        mostrarErro('erro-confirmar', 'As senhas não coincidem.');
        marcarInput(inputConfirmar, false);
        return false;
    }
    limparErro('erro-confirmar');
    marcarInput(inputConfirmar, true);
    return true;
}

function validarEndereco() {
    const valor = inputEndereco.value.trim();

    if (valor === '') {
        mostrarErro('erro-endereco', 'O endereço é obrigatório.');
        marcarInput(inputEndereco, false);
        return false;
    }
    if (valor.length < 10) {
        mostrarErro('erro-endereco', 'Informe um endereço mais completo (mínimo 10 caracteres).');
        marcarInput(inputEndereco, false);
        return false;
    }
    limparErro('erro-endereco');
    marcarInput(inputEndereco, true);
    return true;
}

function validarTelefones() {
    const inputs = divTelefones.querySelectorAll('input[type="tel"]');
    let todoValido = true;

    inputs.forEach(input => {
        const digitos = input.value.replace(/\D/g, '');
        if (digitos.length < 10) {
            marcarInput(input, false);
            todoValido = false;
        } else {
            marcarInput(input, true);
        }
    });

    if (!todoValido) {
        mostrarErro('erro-telefone', 'Informe um telefone válido com DDD (ex: (11) 91234-5678).');
    } else {
        limparErro('erro-telefone');
    }

    return todoValido;
}


// ─── 6. EVENTOS DE VALIDAÇÃO EM TEMPO REAL ────

inputNome.addEventListener('input', validarNome);
inputEmail.addEventListener('input', validarEmail);
inputSenha.addEventListener('input', validarSenha);
inputConfirmar.addEventListener('input', validarConfirmacao);
inputEndereco.addEventListener('input', validarEndereco);

inputNome.addEventListener('blur', validarNome);
inputEmail.addEventListener('blur', validarEmail);
inputSenha.addEventListener('blur', validarSenha);
inputConfirmar.addEventListener('blur', validarConfirmacao);
inputEndereco.addEventListener('blur', validarEndereco);


// ─── 7. OLHINHO (mostrar/ocultar senha) ───────

function toggleSenha(inputSenhaEl, btnOlhinho) {
    const visivel = inputSenhaEl.type === 'text';
    inputSenhaEl.type = visivel ? 'password' : 'text';
    btnOlhinho.classList.toggle('ativo', !visivel);
    btnOlhinho.setAttribute('aria-label',
        visivel ? 'Mostrar senha' : 'Ocultar senha');
}

olhinho.addEventListener('click', () => toggleSenha(inputSenha, olhinho));
olhinhoConfirmar.addEventListener('click', () => toggleSenha(inputConfirmar, olhinhoConfirmar));


// ─── 8. LISTA DE CADASTROS ────────────────────

/**
 * Renderiza todos os cadastros salvos em cards abaixo do formulário.
 * Cada card tem os dados + olhinho de senha + botão excluir.
 */
function renderizarCadastros() {
    // Busca ou cria o container da seção de cadastros
    let secao = document.getElementById('secao-cadastros');

    if (!secao) {
        secao = document.createElement('div');
        secao.id = 'secao-cadastros';
        // Insere logo após o form-container
        document.querySelector('.form-container').after(secao);
    }

    // Sem cadastros: limpa e sai
    if (listaCadastros.length === 0) {
        secao.innerHTML = '';
        return;
    }

    secao.innerHTML = `
        <div class="cadastros-header">
            <h3>👥 Cadastros Realizados <span class="badge">${listaCadastros.length}</span></h3>
        </div>
        <div id="cadastros-lista"></div>
    `;

    const container = document.getElementById('cadastros-lista');

    listaCadastros.forEach((cadastro, index) => {
        const telefonesHtml = cadastro.telefones
            .map((tel, i) => `<li>📞 Telefone ${i + 1}: <strong>${tel}</strong></li>`)
            .join('');

        const card = document.createElement('div');
        card.className = 'cadastro-card';

        card.innerHTML = `
            <div class="card-topo">
                <div class="card-avatar">${cadastro.nome.charAt(0).toUpperCase()}</div>
                <div class="card-info-topo">
                    <strong class="card-nome">${cadastro.nome}</strong>
                    <span class="card-email">${cadastro.email}</span>
                </div>
                <button type="button" class="btn-excluir" aria-label="Excluir cadastro de ${cadastro.nome}">
                    🗑️ Excluir
                </button>
            </div>
            <ul class="card-dados">
                <li class="resumo-senha-linha">
                    🔒 Senha:
                    <strong class="card-senha-texto">••••••••</strong>
                    <button type="button" class="olhinho-resumo card-olhinho" aria-label="Mostrar senha"></button>
                </li>
                <li>🏠 Endereço: <strong>${cadastro.endereco}</strong></li>
                ${telefonesHtml}
            </ul>
        `;

        // Olhinho do card
        const btnOlhinhoCard = card.querySelector('.card-olhinho');
        const textoSenhaCard = card.querySelector('.card-senha-texto');
        let senhaVisivelCard = false;

        btnOlhinhoCard.addEventListener('click', () => {
            senhaVisivelCard = !senhaVisivelCard;
            textoSenhaCard.textContent = senhaVisivelCard ? cadastro.senha : '••••••••';
            btnOlhinhoCard.classList.toggle('ativo', senhaVisivelCard);
            btnOlhinhoCard.setAttribute('aria-label',
                senhaVisivelCard ? 'Ocultar senha' : 'Mostrar senha');
        });

        // Botão excluir
        card.querySelector('.btn-excluir').addEventListener('click', () => {
            excluirCadastro(index);
        });

        container.appendChild(card);
    });
}

/**
 * Remove um cadastro pelo índice com confirmação e re-renderiza.
 * @param {number} index - posição no array listaCadastros
 */
function excluirCadastro(index) {
    const nome = listaCadastros[index].nome;
    if (!confirm(`Deseja realmente excluir o cadastro de "${nome}"?`)) return;
    listaCadastros.splice(index, 1);
    renderizarCadastros();
}


// ─── 9. SUBMIT DO FORMULÁRIO ──────────────────

form.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const tudo = [
        validarNome(),
        validarEmail(),
        validarSenha(),
        validarConfirmacao(),
        validarEndereco(),
        validarTelefones()
    ];

    const tudoValido = tudo.every(r => r === true);

    mensagemFinal.style.display = 'block';
    mensagemFinal.className = '';

    if (tudoValido) {

        // Coleta os telefones preenchidos
        const telefones = Array.from(divTelefones.querySelectorAll('input[type="tel"]'))
            .map(inp => inp.value);

        // Salva o novo cadastro no array
        const novoCadastro = {
            nome:     inputNome.value.trim(),
            email:    inputEmail.value.trim(),
            senha:    inputSenha.value,
            endereco: inputEndereco.value.trim(),
            telefones
        };
        listaCadastros.push(novoCadastro);

        // Monta o resumo do cadastro recém-feito
        const telefonesHtml = telefones
            .map((tel, i) => `<li>📞 Telefone ${i + 1}: <strong>${tel}</strong></li>`)
            .join('');

        mensagemFinal.classList.add('sucesso');
        mensagemFinal.innerHTML = `
            <p class="resumo-titulo">✅ Cadastro realizado com sucesso!</p>
            <p class="resumo-subtitulo">Confira os dados informados:</p>
            <ul class="resumo-lista">
                <li>👤 Nome: <strong>${novoCadastro.nome}</strong></li>
                <li>📧 E-mail: <strong>${novoCadastro.email}</strong></li>
                <li class="resumo-senha-linha">
                    🔒 Senha:
                    <strong id="resumo-senha-texto">••••••••</strong>
                    <button type="button" class="olhinho-resumo" id="olhinho-resumo" aria-label="Mostrar senha"></button>
                </li>
                <li>🏠 Endereço: <strong>${novoCadastro.endereco}</strong></li>
                ${telefonesHtml}
            </ul>
            <button type="button" id="btn-novo-cadastro">➕ Novo cadastro</button>
        `;

        // Olhinho do resumo
        const olhinhoResumo = document.getElementById('olhinho-resumo');
        const textoSenha    = document.getElementById('resumo-senha-texto');
        let senhaVisivel    = false;

        olhinhoResumo.addEventListener('click', () => {
            senhaVisivel = !senhaVisivel;
            textoSenha.textContent = senhaVisivel ? novoCadastro.senha : '••••••••';
            olhinhoResumo.classList.toggle('ativo', senhaVisivel);
            olhinhoResumo.setAttribute('aria-label',
                senhaVisivel ? 'Ocultar senha' : 'Mostrar senha');
        });

        // Botão "Novo cadastro": limpa o formulário
        document.getElementById('btn-novo-cadastro').addEventListener('click', limparFormulario);

        // Atualiza a lista geral de cadastros
        renderizarCadastros();
        mensagemFinal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } else {
        mensagemFinal.classList.add('erro-final');
        mensagemFinal.textContent = '⚠️ Corrija os campos destacados antes de continuar.';

        const primeiroErro = form.querySelector('input.erro');
        if (primeiroErro) primeiroErro.focus();
    }
});


// ─── 10. LIMPAR FORMULÁRIO ────────────────────

/**
 * Reseta todos os campos e estados visuais do formulário
 * para permitir um novo cadastro sem recarregar a página.
 */
function limparFormulario() {
    // Limpa os inputs principais
    inputNome.value      = '';
    inputEmail.value     = '';
    inputSenha.value     = '';
    inputConfirmar.value = '';
    inputEndereco.value  = '';

    // Remove classes de validação de todos os inputs
    form.querySelectorAll('input').forEach(inp => inp.classList.remove('ok', 'erro'));

    // Limpa todas as mensagens de erro inline
    form.querySelectorAll('.erro-msg').forEach(span => { span.textContent = ''; });

    // Reseta barra e texto de força de senha
    barraForca.className   = '';
    barraForca.style.width = '0';
    forcaTexto.textContent = '';

    // Fecha os olhinhos do formulário
    inputSenha.type     = 'password';
    inputConfirmar.type = 'password';
    olhinho.classList.remove('ativo');
    olhinhoConfirmar.classList.remove('ativo');

    // Reseta telefones: remove todos e cria 1 campo vazio
    divTelefones.innerHTML = '';
    adicionarTelefone();

    // Esconde a mensagem de resumo
    mensagemFinal.style.display = 'none';
    mensagemFinal.innerHTML     = '';

    // Rola para o topo e foca no primeiro campo
    window.scrollTo({ top: 0, behavior: 'smooth' });
    inputNome.focus();
}