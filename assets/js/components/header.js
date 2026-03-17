(function () {
    // --- 1. SELECCIÓN DE ELEMENTOS DEL DOM ---
    const header = document.querySelector('.main-header');
    const burger = document.querySelector('.header-burger');
    const menu = document.getElementById('headerMenu');
    const perfil = document.querySelector('.header-perfil');
    const perfilSlot = document.getElementById('headerPerfilSlot');
    // --- 2. FUNCIONES PRINCIPALES ---
    /**
     * Controla la apertura y cierre del menú móvil.
     * Gestiona las clases visuales y los atributos de accesibilidad (ARIA).
     * @param {boolean} isOpen - true para abrir el menú, false para cerrarlo.
     */
    function setMenuOpen(isOpen) {
        if (!header || !burger || !menu) return;
        header.classList.toggle('menu-open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    }
    /**
     * Adapta dinámicamente la ubicación del bloque de perfil.
     * En móvil lo mueve dentro del menú desplegable; en PC lo devuelve a la barra superior.
     */
    function syncPerfilLocation() {
        if (!menu || !perfil || !perfilSlot) return;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Si es móvil y no está en el menú, lo metemos al final del menú
            if (perfil.parentElement !== menu) menu.appendChild(perfil);
        } else {
            // Si es PC y está en el menú, lo sacamos y lo ponemos junto a su 'slot' original
            if (perfil.parentElement === menu) perfilSlot.after(perfil);
        }
    }
    // --- 3. EVENTOS Y LISTENERS ---
    if (burger && menu && header) {
        // Alternar el menú al hacer clic en la hamburguesa
        burger.addEventListener('click', () => {
            const isOpen = header.classList.contains('menu-open');
            setMenuOpen(!isOpen);
        });
        // Cerrar el menú automáticamente al hacer clic en cualquier enlace
        menu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => setMenuOpen(false));
        });
        // Reposicionar elementos y cerrar menús si el usuario redimensiona la ventana
        window.addEventListener('resize', () => {
            syncPerfilLocation();
            if (window.innerWidth > 768) setMenuOpen(false);
        });
    }

    syncPerfilLocation();
    // --- 4. GESTIÓN DE SESIÓN (LOGIN / LOGOUT) ---
    const user = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (user) {
        // Actualizamos los datos visuales de la cabecera si el usuario está logueado
        const enlacePerfil = document.getElementById('enlacePerfilHeader');
        if (enlacePerfil) {
            enlacePerfil.href = 'perfil.html';
            document.getElementById('textoPerfilHeader').textContent = user.nombre;
        }
        // Configuramos el botón de cerrar sesión
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

    // --- 5. RESALTADO DE LA PÁGINA ACTUAL (NAV ACTIVO) ---
    // Extraemos el nombre del archivo actual de la URL (por defecto index.html)
    const pagina = window.location.pathname.split('/').pop() || 'index.html';
    // Comparamos los enlaces del nav con la página actual y le damos estilo
    document.querySelectorAll('.enlace-nav').forEach(a => {
        if (a.getAttribute('href') === pagina) {
            a.classList.add('activo');
        }
    });
})();
