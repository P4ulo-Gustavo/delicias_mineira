/**
 * login.js — AutoElite
 * Responsável exclusivamente pelo comportamento da tela de Login
 */

(function () {
    'use strict';

    // ── Elementos ─────────────────────────────────────────
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const emailGroup = document.getElementById('emailGroup');
    const passwordGroup = document.getElementById('passwordGroup');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginAlert = document.getElementById('loginAlert');
    const loginSubmit = document.getElementById('loginSubmit');
    const togglePwd = document.getElementById('togglePassword');
    const forgotBtn = document.getElementById('forgotBtn');
    const forgotModal = document.getElementById('forgotModal');
    const modalClose = document.getElementById('modalClose');
    const forgotForm = document.getElementById('forgotForm');
    const forgotEmail = document.getElementById('forgotEmail');
    const forgotError = document.getElementById('forgotError');
    const forgotAlert = document.getElementById('forgotAlert');
    const oauthGoogle = document.getElementById('oauthGoogle');
    const oauthFacebook = document.getElementById('oauthFacebook');
    const rememberMe = document.getElementById('rememberMe');

    // ── Utilitários ───────────────────────────────────────
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setFieldError(group, errorEl, message) {
        group.classList.add('has-error');
        group.classList.remove('is-valid');
        errorEl.textContent = message;
    }

    function setFieldValid(group, errorEl) {
        group.classList.remove('has-error');
        group.classList.add('is-valid');
        errorEl.textContent = '';
    }

    function clearField(group, errorEl) {
        group.classList.remove('has-error', 'is-valid');
        errorEl.textContent = '';
    }

    function showAlert(el, message, type) {
        el.textContent = message;
        el.className = 'form-alert ' + type;
        el.style.display = 'block';
    }

    function hideAlert(el) {
        el.style.display = 'none';
        el.textContent = '';
        el.className = 'form-alert';
    }

    function setLoading(loading) {
        const btnText = loginSubmit.querySelector('.btn-text');
        const btnSpinner = loginSubmit.querySelector('.btn-spinner');
        loginSubmit.disabled = loading;
        btnText.style.display = loading ? 'none' : 'inline';
        btnSpinner.style.display = loading ? 'inline-flex' : 'none';
    }

    // ── Validação em tempo real ───────────────────────────
    emailInput.addEventListener('blur', function () {
        const val = emailInput.value.trim();
        if (!val) {
            setFieldError(emailGroup, emailError, 'O e-mail é obrigatório.');
        } else if (!isValidEmail(val)) {
            setFieldError(emailGroup, emailError, 'Formato de e-mail inválido.');
        } else {
            setFieldValid(emailGroup, emailError);
        }
    });

    emailInput.addEventListener('input', function () {
        if (emailGroup.classList.contains('has-error')) {
            clearField(emailGroup, emailError);
        }
    });

    passwordInput.addEventListener('blur', function () {
        const val = passwordInput.value;
        if (!val) {
            setFieldError(passwordGroup, passwordError, 'A senha é obrigatória.');
        } else if (val.length < 6) {
            setFieldError(passwordGroup, passwordError, 'Mínimo de 6 caracteres.');
        } else {
            setFieldValid(passwordGroup, passwordError);
        }
    });

    passwordInput.addEventListener('input', function () {
        if (passwordGroup.classList.contains('has-error')) {
            clearField(passwordGroup, passwordError);
        }
    });

    // ── Toggle visibilidade da senha ──────────────────────
    togglePwd.addEventListener('click', function () {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        togglePwd.querySelector('.eye-icon').style.display = isPassword ? 'none' : 'block';
        togglePwd.querySelector('.eye-off-icon').style.display = isPassword ? 'block' : 'none';
        togglePwd.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
    });

    // ── Submit ────────────────────────────────────────────
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        hideAlert(loginAlert);

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        let valid = true;

        // Valida e-mail
        if (!email) {
            setFieldError(emailGroup, emailError, 'O e-mail é obrigatório.');
            valid = false;
        } else if (!isValidEmail(email)) {
            setFieldError(emailGroup, emailError, 'Formato de e-mail inválido.');
            valid = false;
        } else {
            setFieldValid(emailGroup, emailError);
        }

        // Valida senha
        if (!password) {
            setFieldError(passwordGroup, passwordError, 'A senha é obrigatória.');
            valid = false;
        } else if (password.length < 6) {
            setFieldError(passwordGroup, passwordError, 'Mínimo de 6 caracteres.');
            valid = false;
        } else {
            setFieldValid(passwordGroup, passwordError);
        }

        if (!valid) return;

        // Simula autenticação
        setLoading(true);

        setTimeout(function () {
            setLoading(false);

            // Simulação: conta de teste
            if (email === 'teste@autoelite.com' && password === '123456') {
                showAlert(loginAlert, '✓ Login realizado com sucesso! Redirecionando…', 'success');
                if (rememberMe.checked) {
                    localStorage.setItem('ae_user', JSON.stringify({ email, remember: true }));
                } else {
                    sessionStorage.setItem('ae_user', JSON.stringify({ email }));
                }
                setTimeout(function () {
                    window.location.href = '../index.html';
                }, 1500);
            } else {
                showAlert(loginAlert, 'E-mail ou senha incorretos. Tente novamente.', 'error');
                passwordInput.value = '';
                clearField(passwordGroup, passwordError);
                passwordInput.focus();
            }
        }, 1600);
    });

    // ── Preenche e-mail lembrado ──────────────────────────
    (function restoreEmail() {
        try {
            const saved = JSON.parse(localStorage.getItem('ae_user'));
            if (saved && saved.remember && saved.email) {
                emailInput.value = saved.email;
                rememberMe.checked = true;
            }
        } catch (_) { }
    })();

    // ── OAuth (simulado) ──────────────────────────────────
    function handleOAuth(provider) {
        showAlert(loginAlert,
            'Aguarde… conectando com ' + provider + '.',
            'success'
        );
        setTimeout(function () {
            hideAlert(loginAlert);
            showAlert(loginAlert,
                provider + ' OAuth não configurado neste ambiente de demonstração.',
                'error'
            );
        }, 1200);
    }

    oauthGoogle.addEventListener('click', function () { handleOAuth('Google'); });
    oauthFacebook.addEventListener('click', function () { handleOAuth('Facebook'); });

    // ── Modal: Esqueci minha senha ────────────────────────
    function openModal() {
        forgotModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(function () { forgotEmail.focus(); }, 100);
    }

    function closeModal() {
        forgotModal.style.display = 'none';
        document.body.style.overflow = '';
        forgotForm.reset();
        forgotError.textContent = '';
        hideAlert(forgotAlert);
    }

    forgotBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
    });

    modalClose.addEventListener('click', closeModal);

    forgotModal.addEventListener('click', function (e) {
        if (e.target === forgotModal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && forgotModal.style.display === 'flex') {
            closeModal();
        }
    });

    forgotForm.addEventListener('submit', function (e) {
        e.preventDefault();
        hideAlert(forgotAlert);
        const email = forgotEmail.value.trim();

        if (!email) {
            forgotError.textContent = 'Informe o e-mail cadastrado.';
            return;
        }
        if (!isValidEmail(email)) {
            forgotError.textContent = 'E-mail inválido.';
            return;
        }

        forgotError.textContent = '';
        const btn = forgotForm.querySelector('.btn-submit');
        btn.disabled = true;

        setTimeout(function () {
            btn.disabled = false;
            showAlert(forgotAlert,
                '✓ Se esse e-mail estiver cadastrado, você receberá as instruções em breve.',
                'success'
            );
            forgotEmail.value = '';
        }, 1400);
    });

    // ── Expõe API global ──────────────────────────────────
    window.AutoElite = window.AutoElite || {};
    window.AutoElite.login = {
        openForgotModal: openModal,
        closeForgotModal: closeModal
    };

})();