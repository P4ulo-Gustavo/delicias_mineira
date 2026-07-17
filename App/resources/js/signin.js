/**
 * signin.js — AutoElite
 * Responsável exclusivamente pelo comportamento da tela de Cadastro (multi-step)
 */

(function () {
    'use strict';

    // ── Estado ────────────────────────────────────────────
    let currentStep = 1;
    const TOTAL_STEPS = 3;

    // ── Elementos globais ─────────────────────────────────
    const form = document.getElementById('signinForm');
    const signinAlert = document.getElementById('signinAlert');
    const signinSubmit = document.getElementById('signinSubmit');
    const successOverlay = document.getElementById('successOverlay');

    // Steps
    const stepEls = document.querySelectorAll('.step');
    const stepLines = document.querySelectorAll('.step-line');

    // Step 1
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const signEmailInput = document.getElementById('signEmail');
    const firstNameGroup = document.getElementById('firstNameGroup');
    const lastNameGroup = document.getElementById('lastNameGroup');
    const emailGroup = document.getElementById('emailGroup');
    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const signEmailError = document.getElementById('signEmailError');

    // Step 2
    const signPasswordInput = document.getElementById('signPassword');
    const confirmInput = document.getElementById('confirmPassword');
    const passwordGroup = document.getElementById('passwordGroup');
    const confirmGroup = document.getElementById('confirmGroup');
    const signPasswordError = document.getElementById('signPasswordError');
    const confirmError = document.getElementById('confirmPasswordError');
    const strengthFill = document.getElementById('strengthFill');
    const strengthLabel = document.getElementById('strengthLabel');
    const toggleSignPwd = document.getElementById('toggleSignPwd');

    // Step 3
    const acceptTerms = document.getElementById('acceptTerms');
    const termsError = document.getElementById('termsError');

    // Botões de navegação
    const nextStep1Btn = document.getElementById('nextStep1');
    const nextStep2Btn = document.getElementById('nextStep2');
    const backStep2Btn = document.getElementById('backStep2');
    const backStep3Btn = document.getElementById('backStep3');

    // Phone
    const phoneInput = document.getElementById('phone');

    // ── Utilitários ───────────────────────────────────────
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setError(group, errorEl, msg) {
        group.classList.add('has-error');
        group.classList.remove('is-valid');
        errorEl.textContent = msg;
    }

    function setValid(group, errorEl) {
        group.classList.remove('has-error');
        group.classList.add('is-valid');
        errorEl.textContent = '';
    }

    function clearState(group, errorEl) {
        group.classList.remove('has-error', 'is-valid');
        errorEl.textContent = '';
    }

    function showAlert(msg, type) {
        signinAlert.textContent = msg;
        signinAlert.className = 'form-alert ' + type;
        signinAlert.style.display = 'block';
    }

    function hideAlert() {
        signinAlert.style.display = 'none';
        signinAlert.textContent = '';
        signinAlert.className = 'form-alert';
    }

    // ── Indicador de steps ────────────────────────────────
    function updateStepIndicator(active) {
        stepEls.forEach(function (el, i) {
            const num = i + 1;
            el.classList.remove('active', 'done');
            if (num < active) el.classList.add('done');
            if (num === active) el.classList.add('active');
        });
        stepLines.forEach(function (line, i) {
            line.classList.toggle('done', i + 1 < active);
        });
    }

    // ── Navegação entre steps ─────────────────────────────
    function goToStep(n) {
        const current = document.getElementById('step' + currentStep);
        const next = document.getElementById('step' + n);

        if (current) current.classList.remove('active');
        if (next) next.classList.add('active');

        currentStep = n;
        updateStepIndicator(n);
        hideAlert();
    }

    // ── Validação Step 1 ──────────────────────────────────
    function validateStep1() {
        let ok = true;

        if (!firstNameInput.value.trim()) {
            setError(firstNameGroup, firstNameError, 'Informe seu nome.');
            ok = false;
        } else { setValid(firstNameGroup, firstNameError); }

        if (!lastNameInput.value.trim()) {
            setError(lastNameGroup, lastNameError, 'Informe seu sobrenome.');
            ok = false;
        } else { setValid(lastNameGroup, lastNameError); }

        const email = signEmailInput.value.trim();
        if (!email) {
            setError(emailGroup, signEmailError, 'O e-mail é obrigatório.');
            ok = false;
        } else if (!isValidEmail(email)) {
            setError(emailGroup, signEmailError, 'Formato de e-mail inválido.');
            ok = false;
        } else { setValid(emailGroup, signEmailError); }

        return ok;
    }

    // ── Validação Step 2 ──────────────────────────────────
    function validateStep2() {
        let ok = true;
        const pwd = signPasswordInput.value;
        const cpwd = confirmInput.value;

        if (!pwd) {
            setError(passwordGroup, signPasswordError, 'A senha é obrigatória.');
            ok = false;
        } else if (pwd.length < 8) {
            setError(passwordGroup, signPasswordError, 'Mínimo de 8 caracteres.');
            ok = false;
        } else { setValid(passwordGroup, signPasswordError); }

        if (!cpwd) {
            setError(confirmGroup, confirmError, 'Confirme sua senha.');
            ok = false;
        } else if (cpwd !== pwd) {
            setError(confirmGroup, confirmError, 'As senhas não coincidem.');
            ok = false;
        } else { setValid(confirmGroup, confirmError); }

        return ok;
    }

    // ── Validação Step 3 ──────────────────────────────────
    function validateStep3() {
        if (!acceptTerms.checked) {
            termsError.textContent = 'Você precisa aceitar os termos para continuar.';
            return false;
        }
        termsError.textContent = '';
        return true;
    }

    // ── Força da senha ────────────────────────────────────
    function measureStrength(pwd) {
        let score = 0;
        if (pwd.length >= 8) score++;
        if (pwd.length >= 12) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;
        return score;
    }

    signPasswordInput.addEventListener('input', function () {
        const pwd = signPasswordInput.value;
        const score = pwd ? measureStrength(pwd) : 0;

        const levels = [
            { cls: '', label: '', pct: '0%' },
            { cls: 'weak', label: 'Fraca', pct: '25%' },
            { cls: 'fair', label: 'Regular', pct: '50%' },
            { cls: 'good', label: 'Boa', pct: '75%' },
            { cls: 'strong', label: 'Forte', pct: '100%' },
            { cls: 'strong', label: 'Forte', pct: '100%' },
        ];

        const level = levels[Math.min(score, 5)];
        strengthFill.className = 'strength-fill ' + level.cls;
        strengthFill.style.width = level.pct;
        strengthLabel.textContent = level.label;
        strengthLabel.style.color = score >= 4 ? '#27ae60' : score >= 3 ? '#2980b9' : score >= 2 ? '#f39c12' : '#c0392b';

        // Limpa erro ao digitar
        if (passwordGroup.classList.contains('has-error')) {
            clearState(passwordGroup, signPasswordError);
        }
    });

    // ── Toggle visibilidade senha ─────────────────────────
    toggleSignPwd.addEventListener('click', function () {
        const isPassword = signPasswordInput.type === 'password';
        signPasswordInput.type = isPassword ? 'text' : 'password';
        toggleSignPwd.querySelector('.eye-icon').style.display = isPassword ? 'none' : 'block';
        toggleSignPwd.querySelector('.eye-off-icon').style.display = isPassword ? 'block' : 'none';
        toggleSignPwd.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
    });

    // ── Máscara de telefone ───────────────────────────────
    phoneInput.addEventListener('input', function () {
        let v = phoneInput.value.replace(/\D/g, '').slice(0, 11);
        if (v.length > 6) {
            v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
        } else if (v.length > 2) {
            v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
        } else if (v.length > 0) {
            v = '(' + v;
        }
        phoneInput.value = v;
    });

    // ── Botões de navegação ───────────────────────────────
    nextStep1Btn.addEventListener('click', function () {
        if (validateStep1()) goToStep(2);
    });

    nextStep2Btn.addEventListener('click', function () {
        if (validateStep2()) goToStep(3);
    });

    backStep2Btn.addEventListener('click', function () { goToStep(1); });
    backStep3Btn.addEventListener('click', function () { goToStep(2); });

    // ── Validação em tempo real Step 1 ────────────────────
    firstNameInput.addEventListener('input', function () {
        if (firstNameGroup.classList.contains('has-error')) clearState(firstNameGroup, firstNameError);
    });
    lastNameInput.addEventListener('input', function () {
        if (lastNameGroup.classList.contains('has-error')) clearState(lastNameGroup, lastNameError);
    });
    signEmailInput.addEventListener('input', function () {
        if (emailGroup.classList.contains('has-error')) clearState(emailGroup, signEmailError);
    });
    confirmInput.addEventListener('input', function () {
        if (confirmGroup.classList.contains('has-error')) clearState(confirmGroup, confirmError);
    });
    acceptTerms.addEventListener('change', function () {
        if (acceptTerms.checked) termsError.textContent = '';
    });

    // ── Submit ────────────────────────────────────────────
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        hideAlert();

        if (!validateStep3()) return;

        // Coleta dados
        const payload = {
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            email: signEmailInput.value.trim(),
            phone: phoneInput.value.trim() || null,
            category: document.querySelector('input[name="category"]:checked')?.value || 'all',
            budget: document.querySelector('input[name="budget"]:checked')?.value || null,
            news: document.getElementById('acceptNews').checked,
            createdAt: new Date().toISOString()
        };

        // Loading
        const btnText = signinSubmit.querySelector('.btn-text');
        const btnSpinner = signinSubmit.querySelector('.btn-spinner');
        signinSubmit.disabled = true;
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline-flex';

        // Simula requisição de cadastro
        setTimeout(function () {
            signinSubmit.disabled = false;
            btnText.style.display = 'inline';
            btnSpinner.style.display = 'none';

            // Salva no localStorage (simulação)
            try {
                localStorage.setItem('ae_registered', JSON.stringify(payload));
            } catch (_) { }

            // Exibe overlay de sucesso
            successOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Redireciona após animação
            setTimeout(function () {
                window.location.href = '../login/login.html';
            }, 2500);

        }, 1800);
    });

    // ── Inicializa ────────────────────────────────────────
    updateStepIndicator(1);

    // ── Expõe API global ──────────────────────────────────
    window.AutoElite = window.AutoElite || {};
    window.AutoElite.signin = {
        goToStep: goToStep,
        getCurrentStep: function () { return currentStep; }
    };

})();