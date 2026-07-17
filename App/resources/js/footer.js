/**
 * footer.js — AutoElite
 * Responsável exclusivamente pelo comportamento do Footer
 */

(function () {
    'use strict';

    // ── Ano dinâmico ──────────────────────────────────────
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ── Newsletter Form ───────────────────────────────────
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const msgEl = document.getElementById('newsletterMsg');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = emailInput.value.trim();

            // Reset
            msgEl.className = 'newsletter-msg';
            msgEl.textContent = '';

            // Validação básica
            if (!email) {
                showMsg('Por favor, informe seu e-mail.', 'error');
                emailInput.focus();
                return;
            }

            if (!isValidEmail(email)) {
                showMsg('E-mail inválido. Tente novamente.', 'error');
                emailInput.focus();
                return;
            }

            // Simula envio (substitua por fetch real)
            simulateSubscribe(email);
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showMsg(text, type) {
        msgEl.textContent = text;
        msgEl.className = 'newsletter-msg ' + type;
    }

    function simulateSubscribe(email) {
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.style.opacity = '0.6';

        // Spinner simples no botão
        const original = btn.innerHTML;
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" style="animation:spin .7s linear infinite">
      <circle cx="12" cy="12" r="10" stroke-opacity=".3"/>
      <path d="M12 2a10 10 0 0 1 10 10"/>
    </svg>`;

        // Injeta keyframe se não existir
        if (!document.getElementById('spinKeyframe')) {
            const style = document.createElement('style');
            style.id = 'spinKeyframe';
            style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
            document.head.appendChild(style);
        }

        setTimeout(function () {
            btn.innerHTML = original;
            btn.disabled = false;
            btn.style.opacity = '1';

            // 90% de chance de sucesso na simulação
            if (Math.random() > 0.1) {
                showMsg('✓ Inscrito com sucesso! Bem-vindo(a).', 'success');
                emailInput.value = '';

                // Salva no localStorage para referência
                try {
                    const subscribers = JSON.parse(localStorage.getItem('ae_subscribers') || '[]');
                    if (!subscribers.includes(email)) {
                        subscribers.push(email);
                        localStorage.setItem('ae_subscribers', JSON.stringify(subscribers));
                    }
                } catch (_) { }

            } else {
                showMsg('Erro ao cadastrar. Tente novamente.', 'error');
            }
        }, 1400);
    }

    // ── Links: scroll suave para âncoras internas ─────────
    const footerLinks = document.querySelectorAll('.footer-col a[href^="#"]');
    footerLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Intersection Observer: anima colunas ao entrar na tela ──
    if ('IntersectionObserver' in window) {
        const cols = document.querySelectorAll('.footer-col, .footer-brand, .footer-newsletter');

        cols.forEach(function (col, i) {
            col.style.opacity = '0';
            col.style.transform = 'translateY(20px)';
            col.style.transition =
                'opacity 0.5s ease ' + (i * 0.07) + 's, transform 0.5s ease ' + (i * 0.07) + 's';
        });

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cols.forEach(function (col) { observer.observe(col); });
    }

    // ── Expõe API global ──────────────────────────────────
    window.AutoElite = window.AutoElite || {};
    window.AutoElite.footer = {
        setYear: function (y) {
            if (yearEl) yearEl.textContent = y;
        }
    };

})();