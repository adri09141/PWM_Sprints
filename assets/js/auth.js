// 1. FUNCIÓN PARA INICIAR SESIÓN
function hacerLogin(evento) {
    evento.preventDefault();

    let correo = document.getElementById('correo').value;
    let contrasena = document.getElementById('contrasena').value;
    let btnError = document.getElementById('error'); // Asegúrate de tener este div en tu HTML

    // Limpiamos el error antes de comprobar
    if(btnError) btnError.style.display = 'none';

    fetch('assets/json/data.json')
        .then(res => res.json())
        .then(data => {
            let usuariosNuevos = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
            let todosLosUsuarios = data.usuarios.concat(usuariosNuevos);

            // 1. Primero buscamos si el correo existe (independientemente de la contraseña)
            let usuarioPorCorreo = todosLosUsuarios.find(u => u.correo === correo);

            // Si no encontramos el correo...
            if (!usuarioPorCorreo) {
                if(btnError) {
                    btnError.style.display = 'block';
                    btnError.textContent = "El correo introducido no está registrado.";
                }
                return; // Cortamos
            }

            // 2. Si el correo existe, comprobamos si la contraseña coincide
            if (usuarioPorCorreo.contrasena !== contrasena) {
                if(btnError) {
                    btnError.style.display = 'block';
                    btnError.textContent = "La contraseña es incorrecta.";
                }
                return; // Cortamos
            }

            // 3. Si llega aquí, es que TODO está bien (correo y contraseña correctos)
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioPorCorreo));

            let btnConfirmar = document.getElementById('confirmar'); // Botón de login
            if (btnConfirmar) {
                btnConfirmar.style.backgroundColor = '#4CAF50';
                btnConfirmar.style.color = 'white';
                btnConfirmar.textContent = "Accediendo... ✅";
                btnConfirmar.disabled = true;
            }

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        });
}

// 2. FUNCIÓN PARA REGISTRARSE
async function hacerRegistro(evento) {
    // Evitamos que recargue la página
    evento.preventDefault();

    // --- PASO 1: VALIDAMOS LA FECHA PRIMERO ---
    let error_fecha = document.getElementById('error_fecha');
    let cajaFisicaFecha = document.getElementById('fecha_nacimiento');
    let error_correo = document.getElementById('error_correo');
    let fechaInput = cajaFisicaFecha.value;

    if(verificaContrasena())
    {
        return;
    }
    if (!fechaInput) {
        error_fecha.style.display = 'block';
        error_fecha.textContent = "Por favor, introduzca su fecha de nacimiento.";
        return; // El 'return' hace que la función se detenga aquí y no registre a nadie
    }

    let fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    let fechaLimpia = new Date(fechaInput);

    let fechaMayorEdad = new Date(fechaLimpia);
    fechaMayorEdad.setFullYear(fechaMayorEdad.getFullYear() + 18);

    if (fechaLimpia > fechaActual) {
        error_fecha.style.display = 'block';
        error_fecha.textContent = "La fecha introducida no es válida.";
        return; // Detenemos el registro
    } else if (fechaMayorEdad > fechaActual) {
        error_fecha.style.display = 'block';
        error_fecha.textContent = "Debe ser mayor de 18 años para poder registrarse.";
        return; // Detenemos el registro
    }

    // --- PASO 2: SI PASÓ LAS PRUEBAS, GUARDAMOS ---
    // Escondemos el error por si estaba visible
    error_fecha.style.display = 'none';
    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let contrasena = document.getElementById('contrasena').value;
    let apellidos = document.getElementById('apellidos').value;
    let fechaNacimiento = document.getElementById('fecha_nacimiento').value;
    let dni = document.getElementById('dni').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;

    // Guardamos los datos simulando que ya entró pero antes verificamos que no exista
    let nuevoUsuario = { nombre: nombre, correo: correo, contrasena: contrasena, apellidos: apellidos, fecha_nacimiento : fechaNacimiento, dni: dni,direccion: direccion, telefono: telefono}
    let usuariosNuevos = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
    let res = await fetch('assets/json/data.json');
    let data = await res.json();

    let todosLosUsuarios = data.usuarios.concat(usuariosNuevos);
    let usuarioPorCorreo = todosLosUsuarios.find(u => u.correo === correo);

    if(usuarioPorCorreo)
    {
        error_correo.style.display = 'block';
        error_correo.textContent = "El correo ya existe!.";
        return;
    }
    usuariosNuevos.push(nuevoUsuario);
    localStorage.setItem('usuarioLogueado', JSON.stringify(nuevoUsuario));
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosNuevos));
    // --- PASO 3: REDIRIGIMOS ---
    let btnCrear = document.getElementById('crear');
    btnCrear.style.backgroundColor = '#4CAF50';
    btnCrear.style.color = 'white';
    btnCrear.textContent = "¡Cuenta creada! ✅";
    btnCrear.disabled = true;

    // Redirigimos rápido (2 segundo es suficiente si el botón cambia)
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
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
// Sirve para Verificar la fecha mediante una expresion regular
function  verificaContrasena() {
    let error_contrasena = document.getElementById('error_contrasena');
    let cajaFisicaContrasena = document.getElementById('contrasena').value;
    const regex = /^(?=(.*[a-zA-Z]){3})(?=.*[0-9])(?=.*[!@#$%^&*.,\-_]).+$/;

    if(!regex.test(cajaFisicaContrasena))
    {
        error_contrasena.style.display = 'block';
        error_contrasena.textContent = "Debe tener al menos [3 letras, 1 numero y 1 caracter especial]";
        return true;
    }
    error_contrasena.style.display = 'none';
    return false;
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
    let inputContrasena = document.getElementById('contrasena');
    let btnVerPass = document.getElementById('btn_ver_contrasena');
    if(inputContrasena && btnVerPass)
    {
        btnVerPass.addEventListener('click', function() {
            // Si está en modo contraseña (oculta)...
            if (inputContrasena.type === "password") {
                inputContrasena.type = "text"; // La hacemos visible
                btnVerPass.textContent = "Ocultar"; // Cambiamos el texto del botón
            } else {
                // Si ya estaba visible, la volvemos a ocultar
                inputContrasena.type = "password";
                btnVerPass.textContent = "Ver";
            }
        });
    }
    // Comprobamos la sesión en todas las páginas
    revisarSesion();
});