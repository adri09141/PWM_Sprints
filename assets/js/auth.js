// 1. FUNCIÓN PARA INICIAR SESIÓN
function hacerLogin(evento) {
    evento.preventDefault();

    let correo = document.getElementById('correo').value;
    let contrasena = document.getElementById('contrasena').value;

    fetch('assets/json/data.json')
        .then(res => res.json())
        .then(data => {
            let usuario = data.usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

            if (usuario) {
                // Guardamos sus datos
                localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
                window.location.href = 'index.html';
            } else {
                alert('Correo o contraseña incorrectos, jefe.'); // Simple y directo por ahora
            }
        });
}

// 2. FUNCIÓN PARA REGISTRARSE
function hacerRegistro(evento) {
    evento.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;

    // Guardamos los datos simulando que ya entró
    localStorage.setItem('usuarioLogueado', JSON.stringify({ nombre: nombre, correo: correo }));
    window.location.href = 'index.html';
}

// 3. FUNCIÓN PARA CAMBIAR LOS BOTONES SI ESTÁ LOGUEADO
function revisarSesion() {
    let usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

    // Si hay alguien guardado en la memoria...
    if (usuario) {
        // Buscamos el botón de crear cuenta de la página de inicio
        let btnRegistro = document.querySelector('a[href="crearCuenta.html"] button');

        if (btnRegistro) {
            // Le cambiamos el texto y el enlace
            btnRegistro.textContent = `¡Hola, ${usuario.nombre}!`;
            btnRegistro.parentElement.href = 'perfil.html';
        }
    }
}
// 4. FUNCIÓN PARA CARGAR DATOS
function cargarDatosGuardados()
{
    // 1. Primero, leemos el "sello" de la memoria para saber quién somos
    let usuarioMemoria = JSON.parse(localStorage.getItem('usuarioLogueado'));

    // Si no hay nadie logueado, cortamos la función aquí para que no dé errores
    if (!usuarioMemoria) return;

    fetch('assets/json/data.json')
    .then(res => res.json())
    .then(data => {
        let misDatosCompletos = data.usuarios.find(u => u.correo === usuarioMemoria.correo);
        if(misDatosCompletos){
            document.getElementById('nombre').value = misDatosCompletos.nombre || "";
            document.getElementById('correo').value = misDatosCompletos.correo || "";
        }else {
            // PLAN B: Es un usuario nuevo (TÚ). No está en el JSON, así que usamos lo de la memoria.
            document.getElementById('nombre').value = usuarioMemoria.nombre || "";
            document.getElementById('correo').value = usuarioMemoria.correo || "";
        }
    })
}
// --- ARRANQUE GENERAL ---
// Cuando la página cargue, conectamos los botones con sus funciones
document.addEventListener('DOMContentLoaded', () => {

    // Conectamos el Login
    let formLogin = document.getElementById('loginForm');
    if (formLogin) {
        formLogin.addEventListener('submit', hacerLogin);
    }
    // Conectamos el Registro (Ojo, he puesto el ID que tienes en tu HTML)
    let formRegistro = document.getElementById('formulario_registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', hacerRegistro);
    }

    // Comprobamos la sesión en todas las páginas
    revisarSesion();
});