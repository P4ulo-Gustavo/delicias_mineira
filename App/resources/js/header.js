/**
 * header.js — AutoElite
 * Responsável exclusivamente pelo comportamento do Header
 */

(function () {
    'use strict';

    const header = document.getElementById('siteHeader');
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');
    const searchToggle = document.getElementById('searchToggle');
    const searchClose = document.getElementById('searchClose');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');

    // ── Scroll: adiciona classe .scrolled ────────────────
    let lastScroll = 0;

    function onScroll() {
        const y = window.scrollY;

        if (y > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Oculta header ao rolar para baixo rápido (> 80px da última pos.)
        if (y > lastScroll + 80 && y > 200) {
            header.style.transform = 'translateY(-100%)';
        } else if (y < lastScroll - 10 || y < 100) {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = y;
    }

    header.style.transition =
        'transform 0.4s cubic-bezier(0.4,0,0.2,1), background 0.3s, box-shadow 0.3s, padding 0.3s';

    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Menu Mobile ───────────────────────────────────────
    hamburger.addEventListener('click', function () {
        const isOpen = mainNav.classList.toggle('mobile-open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fecha menu ao clicar fora
    document.addEventListener('click', function (e) {
        if (
            mainNav.classList.contains('mobile-open') &&
            !mainNav.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            mainNav.classList.remove('mobile-open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // ── Dropdown Mobile ───────────────────────────────────
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    navDropdowns.forEach(function (dd) {
        const link = dd.querySelector('.nav-link');
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 960) {
                e.preventDefault();
                dd.classList.toggle('open');
            }
        });
    });

    // ── Nav links: active state ───────────────────────────
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-dropdown .nav-link)');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.forEach(function (l) { l.classList.remove('active'); });
            link.classList.add('active');
        });
    });

    // ── Search Bar ────────────────────────────────────────
    function openSearch() {
        searchBar.classList.add('open');
        searchBar.setAttribute('aria-hidden', 'false');
        setTimeout(function () { searchInput.focus(); }, 300);
    }

    function closeSearch() {
        searchBar.classList.remove('open');
        searchBar.setAttribute('aria-hidden', 'true');
        searchInput.value = '';
    }

    searchToggle.addEventListener('click', function () {
        const isOpen = searchBar.classList.contains('open');
        if (isOpen) { closeSearch(); } else { openSearch(); }
    });

    searchClose.addEventListener('click', closeSearch);

    // Fecha busca com Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && searchBar.classList.contains('open')) {
            closeSearch();
        }
    });

    // ── Badge de favoritos (simulação) ────────────────────
    const favBadge = document.getElementById('favBadge');
    let favCount = parseInt(favBadge.textContent, 10) || 0;

    // Expõe API global para outros módulos atualizarem o badge
    window.AutoElite = window.AutoElite || {};
    window.AutoElite.updateFavBadge = function (count) {
        favCount = count;
        favBadge.textContent = count;
        favBadge.style.display = count > 0 ? 'flex' : 'none';
    };

    // ── Resize: fecha mobile nav em desktop ───────────────
    window.addEventListener('resize', function () {
        if (window.innerWidth > 960) {
            mainNav.classList.remove('mobile-open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

})();
