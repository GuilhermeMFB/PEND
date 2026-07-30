// ============================================
// FUNCIONALIDADES DO PORTFÓLIO
// ============================================

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa todas as funcionalidades
    initMobileMenu();
    initFormValidation();
    initSmoothScroll();
    initScrollReveal();
    initActiveNavLink();
});

// ============================================
// MENU MOBILE
// ============================================

/**
 * Inicializa o menu responsivo para dispositivos móveis
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    function toggleMenu() {
        const isActive = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(isActive));
    }

    // Toggle do menu ao clicar no hamburger
    hamburger.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Fecha o menu com a tecla Esc
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// ============================================
// VALIDAÇÃO DO FORMULÁRIO
// ============================================

/**
 * Inicializa a validação do formulário de contato
 */
function initFormValidation() {
    const form = document.getElementById('contato-form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const nomeError = document.getElementById('nome-error');
    const emailError = document.getElementById('email-error');
    const successMessage = document.getElementById('success-message');

    if (!form) return;

    // Adiciona listener de submit no formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão

        // Reseta mensagens de erro
        resetErrors();

        // Realiza as validações
        const isNomeValid = validateNome(nomeInput, nomeError);
        const isEmailValid = validateEmail(emailInput, emailError);

        // Se todas as validações passarem, processa o formulário
        if (isNomeValid && isEmailValid) {
            handleFormSubmission(nomeInput, form, successMessage);
        }
    });

    // Validação em tempo real para o campo nome
    nomeInput.addEventListener('input', function() {
        if (nomeInput.value.trim().length > 0) {
            validateNome(nomeInput, nomeError);
        }
    });

    // Validação em tempo real para o campo email
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim().length > 0) {
            validateEmail(emailInput, emailError);
        }
    });
}

/**
 * Valida o campo nome
 * @param {HTMLElement} input - Input do nome
 * @param {HTMLElement} errorElement - Elemento para mostrar erro
 * @returns {boolean} - Retorna true se válido, false se inválido
 */
function validateNome(input, errorElement) {
    const nome = input.value.trim();

    // Verifica se o campo está vazio
    if (nome.length === 0) {
        showError(errorElement, 'Por favor, informe seu nome completo.');
        input.style.borderColor = 'var(--error-color)';
        return false;
    }

    // Verifica se o nome tem pelo menos 3 caracteres
    if (nome.length < 3) {
        showError(errorElement, 'O nome deve ter pelo menos 3 caracteres.');
        input.style.borderColor = 'var(--error-color)';
        return false;
    }

    // Nome válido
    hideError(errorElement);
    input.style.borderColor = 'var(--success-color)';
    return true;
}

/**
 * Valida o campo email
 * @param {HTMLElement} input - Input do email
 * @param {HTMLElement} errorElement - Elemento para mostrar erro
 * @returns {boolean} - Retorna true se válido, false se inválido
 */
function validateEmail(input, errorElement) {
    const email = input.value.trim();

    // Verifica se o campo está vazio
    if (email.length === 0) {
        showError(errorElement, 'Por favor, informe seu endereço de e-mail.');
        input.style.borderColor = 'var(--error-color)';
        return false;
    }

    // Regex para validação de formato de e-mail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        showError(errorElement, 'Por favor, informe um e-mail válido (exemplo: nome@email.com).');
        input.style.borderColor = 'var(--error-color)';
        return false;
    }

    // Email válido
    hideError(errorElement);
    input.style.borderColor = 'var(--success-color)';
    return true;
}

/**
 * Processa o envio do formulário após validação bem-sucedida
 * @param {HTMLElement} nomeInput - Input do nome
 * @param {HTMLElement} form - Formulário
 * @param {HTMLElement} successMessage - Elemento da mensagem de sucesso
 */
function handleFormSubmission(nomeInput, form, successMessage) {
    const nome = nomeInput.value.trim();

    // Exibe mensagem personalizada de sucesso
    successMessage.textContent = `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Em breve entrarei em contato.`;
    successMessage.classList.remove('hidden');

    // Scroll suave até a mensagem de sucesso
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Reseta os estilos dos campos
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });

    // Limpa o formulário após 3 segundos
    setTimeout(function() {
        form.reset();
        successMessage.classList.add('hidden');
    }, 3000);
}

/**
 * Exibe mensagem de erro
 * @param {HTMLElement} element - Elemento para mostrar o erro
 * @param {string} message - Mensagem de erro
 */
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

/**
 * Esconde mensagem de erro
 * @param {HTMLElement} element - Elemento do erro
 */
function hideError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

/**
 * Reseta todas as mensagens de erro
 */
function resetErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// ============================================
// SCROLL SUAVE
// ============================================

/**
 * Inicializa o scroll suave para links de âncora, descontando
 * a altura real do cabeçalho fixo (evita ficar "atrás" da navbar)
 */
function initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    const navbar = document.querySelector('.navbar');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            e.preventDefault();

            const headerOffset = navbar ? navbar.offsetHeight + 12 : 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ============================================
// OBSERVER PARA ANIMAÇÕES DE SCROLL
// ============================================

/**
 * Revela elementos com a classe .reveal conforme entram na tela.
 * Progressivo: se JavaScript ou IntersectionObserver não estiverem
 * disponíveis, o conteúdo permanece visível (sem classe "armada").
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('is-visible'));
        return;
    }

    reveals.forEach(el => el.classList.add('reveal-armed'));

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

// ============================================
// LINK ATIVO NA NAVEGAÇÃO
// ============================================

/**
 * Marca o link do menu correspondente à seção visível no momento
 */
function initActiveNavLink() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0 || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            }
        });
    }, { rootMargin: '-45% 0px -45% 0px' });

    sections.forEach(section => observer.observe(section));
}