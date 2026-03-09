// 1. FUNCIÓN PARA INICIAR SESIÓN
function hacerLogin(evento) {
    evento.preventDefault();

    let correo = document.getElementById('correo').value;
    let contrasena = document.getElementById('contrasena').value;


    fetch('assets/json/data.json')
        .then(res => res.json())
        .then(data => {
            let usuariosNuevos = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
            let todosLosUsuarios = data.usuarios.concat(usuariosNuevos);
            // Buscamos en la lista combinada
            let usuario = todosLosUsuarios.find(u => u.correo === correo && u.contrasena === contrasena);

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
    // Evitamos que recargue la página
    evento.preventDefault();

    // --- PASO 1: VALIDAMOS LA FECHA PRIMERO ---
    let mensajeError = document.getElementById('mensaje_error');
    let cajaFisicaFecha = document.getElementById('fecha_nacimiento');
    let fechaInput = cajaFisicaFecha.value;

    if (!fechaInput) {
        mensajeError.style.display = 'block';
        mensajeError.textContent = "Por favor, introduce una fecha.";
        return; // El 'return' hace que la función se detenga aquí y no registre a nadie
    }

    let fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    let fechaLimpia = new Date(fechaInput);

    let fechaMayorEdad = new Date(fechaLimpia);
    fechaMayorEdad.setFullYear(fechaMayorEdad.getFullYear() + 18);

    if (fechaLimpia > fechaActual) {
        mensajeError.style.display = 'block';
        mensajeError.textContent = "¡No puedes nacer en el futuro, jefe!";
        return; // Detenemos el registro
    } else if (fechaMayorEdad > fechaActual) {
        mensajeError.style.display = 'block';
        mensajeError.textContent = "Lo sentimos, los menores de 18 años no pueden adoptar.";
        return; // Detenemos el registro
    }

    // --- PASO 2: SI PASÓ LAS PRUEBAS, GUARDAMOS ---
    mensajeError.style.display = 'none'; // Escondemos el error por si estaba visible

    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let contrasena = document.getElementById('contrasena').value;
    let apellidos = document.getElementById('apellidos').value;
    let fechaNacimiento = document.getElementById('fecha_nacimiento').value;
    let dni = document.getElementById('dni').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;
    // Guardamos los datos simulando que ya entró
    let nuevoUsuario = { nombre: nombre, correo: correo, contrasena: contrasena, apellidos: apellidos, fecha_nacimiento : fechaNacimiento, dni: dni,direccion: direccion, telefono: telefono}
    localStorage.setItem('usuarioLogueado', JSON.stringify(nuevoUsuario));

    let usuariosNuevos = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    usuariosNuevos.push(nuevoUsuario);
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosNuevos));
    // --- PASO 3: REDIRIGIMOS ---
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
            document.getElementById('apellidos').value = misDatosCompletos.apellidos || "";
            document.getElementById('fecha_nacimiento').value = misDatosCompletos.fecha_nacimiento || "";
            document.getElementById('dni').value = misDatosCompletos.dni || "";
            document.getElementById('direccion').value = misDatosCompletos.direccion || "";
            document.getElementById('telefono').value = misDatosCompletos.telefono || "";
            document.getElementById('n_adopciones').value = misDatosCompletos.n_adopciones || "0";
        }else {
            // PLAN B: Es un usuario nuevo (TÚ). No está en el JSON, así que usamos lo de la memoria.
            document.getElementById('nombre').value = usuarioMemoria.nombre || "";
            document.getElementById('correo').value = usuarioMemoria.correo || "";
            document.getElementById('apellidos').value = usuarioMemoria.apellidos || "";
            document.getElementById('fecha_nacimiento').value = usuarioMemoria.fecha_nacimiento || "";
            document.getElementById('dni').value = usuarioMemoria.dni || "";
            document.getElementById('direccion').value = usuarioMemoria.direccion || "";
            document.getElementById('telefono').value = usuarioMemoria.telefono || "";
            document.getElementById('n_adopciones').value = usuarioMemoria.n_adopciones || "0";
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