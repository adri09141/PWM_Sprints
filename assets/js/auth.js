document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo del Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitamos que el formulario recargue la página si pasa la validación

            // Ya hemos pasado la validación nativa (required, typer=email, minlength), validamos contra JSON simulando backend
            const correo = document.getElementById('correo').value;
            const contrasena = document.getElementById('contrasena').value;
            const errorDiv = document.getElementById('loginError');

            fetch('assets/json/data.json')
                .then(res => res.json())
                .then(data => {
                    // Buscar usuario
                    const usuario = data.usuarios.find(u => u.correo === correo && u.contraseña === contrasena);
                    if (usuario) {
                        // Guardar sesión
                        localStorage.setItem('usuarioLogueado', JSON.stringify({
                            nombre: usuario.nombre,
                            correo: usuario.correo
                        }));
                        window.location.href = 'index.html'; // Redirigir al inicio logueado
                    } else {
                        errorDiv.textContent = 'Correo o contraseña incorrectos.';
                    }
                })
                .catch(err => {
                    console.error('Error al iniciar sesión:', err);
                    errorDiv.textContent = 'Hubo un error de conexión.';
                });
        });
    }

    // 2. Manejo del Registro
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Si llega aquí, es que todos los inputs son válidos en HTML5

            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;

            // Simulamos registro exitoso guardando la sesión directamente
            localStorage.setItem('usuarioLogueado', JSON.stringify({
                nombre: nombre,
                correo: correo
            }));

            alert('Registro completado con éxito.');
            window.location.href = 'index.html';
        });
    }

    // 3. Modificar UI según estado de sesión
    actualizarInterfazUsuario();
});

function actualizarInterfazUsuario() {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

    // Si estamos en la Home y hay botones de registro, cambiarlos
    const botonesSeccion = document.querySelector('.botonesSeccionPrincipal');
    if (botonesSeccion && usuarioLogueado) {
        const btnRegistro = botonesSeccion.querySelector('a[href="crearCuenta.html"]');
        if (btnRegistro) {
            btnRegistro.href = 'perfil.html';
            btnRegistro.querySelector('button').textContent = `Hola, ${usuarioLogueado.nombre}`;
        }
    }
}
