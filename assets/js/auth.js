/**
 * Procesa el inicio de sesión comparando datos del JSON y LocalStorage.
 */
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

            // 2. Si no encontramos el correo o si existe, comprobamos si la contraseña coincide
            if (!usuarioPorCorreo || usuarioPorCorreo.contrasena !== contrasena) {
                if(btnError) {
                    btnError.style.display = 'block';
                    btnError.textContent = "Correo o contraseña inválidos.";
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

/**
 * Valida y registra un nuevo usuario en el LocalStorage.
 */
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
    if (verificarFecha(fechaInput))
    {
        return;
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
/**
 * Modifica visualmente los botones de la interfaz si hay un usuario logueado.
 */
function adaptarInterfazSesion() {
    let usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

    // Si hay alguien guardado en la memoria...
    if (usuario) {
        // Buscamos el botón de crear cuenta de la página de inicio
        let btnRegistro = document.querySelector('a[href="crearCuenta.html"] button');

        if (btnRegistro) {
            // Le cambiamos el texto y el enlace
            btnRegistro.textContent = `Espacio de ${usuario.nombre}`;
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
/**
 * Rellena los inputs del perfil con los datos del usuario actual.
 */
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
/**
 * Prepara el listener para actualizar los datos del usuario desde el perfil.
 */
function prepararBotonActualizar() {
    let formPerfil = document.getElementById('formulario_perfil');
    let btnAct = document.getElementById('btn_actualizar');

    if(!btnAct) { return; }
    if(!formPerfil) { return; }
    formPerfil.addEventListener('submit', function(evento) {
        evento.preventDefault();

        // --- FASE 1: IDENTIFICACIÓN DEL USUARIO ---
        let usuarioMemoria = JSON.parse(localStorage.getItem('usuarioLogueado'));
        if (!usuarioMemoria) return;

        let usuariosNuevos = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];

        // Buscamos en qué cajón exacto está nuestro usuario
        let posicion = usuariosNuevos.findIndex(u => u.correo === usuarioMemoria.correo);
        if(posicion === -1) { return; }

        // --- FASE 2: RECOPILACIÓN DE DATOS DEL FORMULARIO ---
        let nombre = document.getElementById('nombre').value;
        let correo = document.getElementById('correo').value;
        let apellidos = document.getElementById('apellidos').value;
        let fechaNacimiento = document.getElementById('fecha_nacimiento').value;
        let dni = document.getElementById('dni').value;
        let direccion = document.getElementById('direccion').value;
        let telefono = document.getElementById('telefono').value;

        let error_telefono = document.getElementById('error_telefono');
        if(error_telefono)
        {
            error_telefono.style.display = 'none';
        }
        if(telefono.length !== 9 || !isDigit(telefono))
        {
            if(error_telefono)
            {
                error_telefono.style.display = 'block';
                error_telefono.textContent = "El teléfono no es válido.";
            }
            return;
        }
        if (verificarFecha(fechaNacimiento))
        {
            return;
        }
        // --- FASE 3: ACTUALIZAR EN BASE DE DATOS GENERAL ---
        usuariosNuevos[posicion].nombre = nombre;
        usuariosNuevos[posicion].correo = correo;
        usuariosNuevos[posicion].apellidos = apellidos;
        usuariosNuevos[posicion].fecha_nacimiento = fechaNacimiento;
        usuariosNuevos[posicion].dni = dni;
        usuariosNuevos[posicion].direccion = direccion;
        usuariosNuevos[posicion].telefono = telefono;

        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosNuevos));

        // --- FASE 4: ACTUALIZAR SESIÓN ACTIVA ---
        usuarioMemoria.nombre = nombre;
        usuarioMemoria.correo = correo;
        usuarioMemoria.apellidos = apellidos;
        usuarioMemoria.fecha_nacimiento = fechaNacimiento;
        usuarioMemoria.dni = dni;
        usuarioMemoria.direccion = direccion;
        usuarioMemoria.telefono = telefono;

        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioMemoria));

        // --- FASE 5: FEEDBACK VISUAL Y REDIRECCIÓN ---
        btnAct.style.backgroundColor = '#4CAF50';
        btnAct.style.color = 'white';
        btnAct.textContent = "¡Datos Actualizados! ✅";
        btnAct.disabled = true;

        setTimeout(() => {
            // Recargamos la página del perfil para que se vean los cambios reflejados
            window.location.href = "perfil.html";
        }, 1000);
    });
}
function borrarCuenta(){
    let btnBorrarCuenta = document.getElementById('btn_borrar_cuenta');
    if(btnBorrarCuenta){
        btnBorrarCuenta.addEventListener('click', function (evento) {
            evento.preventDefault();

            let usuarioMemoria = JSON.parse(localStorage.getItem('usuarioLogueado'));
            if (!usuarioMemoria) return;

            let usuariosNuevos = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];

            let posicion = usuariosNuevos.findIndex(u => u.correo === usuarioMemoria.correo);
            if(posicion === -1) { return; }

            localStorage.removeItem('usuarioLogueado');
            window.location.href = 'index.html';

            usuariosNuevos.splice(posicion, 1);
            localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosNuevos));
        })
    }
}
/** FUNCIONES EXTRAS retornan {true/false} */
function verificarRegistro() {
    return localStorage.getItem('usuarioLogueado') !== null;
}
function verificarFecha(fechaNacimiento) {
    let error_fecha = document.getElementById('error_fecha');

    // Limpiamos el error por si acaso
    if (error_fecha) error_fecha.style.display = 'none';

    // Si no hay fecha, también es un error
    if (!fechaNacimiento) {
        if(error_fecha) {
            error_fecha.style.display = 'block';
            error_fecha.textContent = "Por favor, introduzca su fecha de nacimiento.";
        }
        return true; // Devuelve TRUE (Hay error)
    }

    let fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    let fechaLimpia = new Date(fechaNacimiento);

    let fechaMayorEdad = new Date(fechaLimpia);
    fechaMayorEdad.setFullYear(fechaMayorEdad.getFullYear() + 18);

    if (fechaLimpia > fechaActual) {
        if(error_fecha) {
            error_fecha.style.display = 'block';
            error_fecha.textContent = "La fecha introducida no es válida.";
        }
        return true; // Devuelve TRUE (Hay error)
    } else if (fechaMayorEdad > fechaActual) {
        if(error_fecha) {
            error_fecha.style.display = 'block';
            error_fecha.textContent = "Debe ser mayor de 18 años.";
        }
        return true; // Devuelve TRUE (Hay error)
    }

    return false; // Devuelve FALSE (Todo está perfecto)
}
function isDigit(texto) {
    // Comprueba si el texto contiene ÚNICAMENTE números del 0 al 9
    return /^\d+$/.test(texto);
}

// --- ARRANQUE GENERAL ---
// Cuando la página cargue, conectamos los botones con sus funciones
document.addEventListener('DOMContentLoaded', () => {

    // Formulario Login
    let formLogin = document.getElementById('loginForm');
    if (formLogin) {
        formLogin.addEventListener('submit', hacerLogin);
    }
    // Formulario Registro
    let formRegistro = document.getElementById('formulario_registro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', hacerRegistro);
    }
    // Ver/Ocultar Contraseña
    let inputContrasena = document.getElementById('contrasena');
    let btnVerPass = document.getElementById('btn_ver_contrasena');
    if(inputContrasena && btnVerPass) {
        btnVerPass.addEventListener('click', function () {
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
    prepararBotonActualizar();
    // Comprobamos la sesión en todas las páginas
    adaptarInterfazSesion();
});