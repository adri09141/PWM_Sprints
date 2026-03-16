(function () {
    const header = document.querySelector('.main-header');
    const burger = document.querySelector('.header-burger');
    const menu = document.getElementById('headerMenu');
    const perfil = document.querySelector('.header-perfil');
    const perfilSlot = document.getElementById('headerPerfilSlot');

    function setMenuOpen(isOpen) {
        if (!header || !burger || !menu) return;
        header.classList.toggle('menu-open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    }

    function syncPerfilLocation() {
        if (!menu || !perfil || !perfilSlot) return;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            if (perfil.parentElement !== menu) menu.appendChild(perfil);
        } else {
            if (perfil.parentElement === menu) perfilSlot.after(perfil);
        }
    }

    if (burger && menu && header) {
        burger.addEventListener('click', () => {
            const isOpen = header.classList.contains('menu-open');
            setMenuOpen(!isOpen);
        });

        menu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => setMenuOpen(false));
        });

        window.addEventListener('resize', () => {
            syncPerfilLocation();
            if (window.innerWidth > 768) setMenuOpen(false);
        });
    }

    syncPerfilLocation();

    const user = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (user) {
        const enlacePerfil = document.getElementById('enlacePerfilHeader');
        if (enlacePerfil) {
            enlacePerfil.href = 'perfil.html';
            document.getElementById('textoPerfilHeader').textContent = user.nombre;
        }
        const btnSalir = document.getElementById('enlaceLogout');
        if (btnSalir) {
            btnSalir.style.display = 'inline-block';
            btnSalir.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('usuarioLogueado');
                window.location.href = 'index.html';
            });
        }
    }

    // Marcar enlace activo según la página actual
    const pagina = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.enlace-nav').forEach(a => {
        if (a.getAttribute('href') === pagina) {
            a.classList.add('activo');
        }
    });
})();
