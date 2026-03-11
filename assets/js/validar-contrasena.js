document.addEventListener('DOMContentLoaded', function() {

    const btnConfirmar = document.getElementById('btn_confirmar');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function() {
            let passActual = document.getElementById('contrasena_actual').value;
            let pass1 = document.getElementById('contrasena').value;
            let pass2 = document.getElementById('contrasena_nueva2').value;

            let errorGeneral = document.getElementById('mensaje_error');
            let errorActual = document.getElementById('mensaje_error2');

            // Limpiar errores previos
            if (errorGeneral) {
                errorGeneral.style.display = 'none';
                errorGeneral.style.color = 'red';
            }
            if (errorActual) errorActual.style.display = 'none';

            let usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

            if (!usuario) {
                window.location.href = "iniciarSension.html";
                return;
            }

            // Validaciones
            if (passActual === "" || pass1 === "" || pass2 === "") {
                errorGeneral.style.display = 'block';
                errorGeneral.textContent = "Por favor, complete todos los campos obligatorios.";
                return;
            }
            if(passActual === pass1)
            {
                errorGeneral.style.display = 'block';
                errorGeneral.textContent = "No puede ser la misma de antes.";
                return;
            }
            if (pass1 !== pass2) {
                errorGeneral.style.display = 'block';
                errorGeneral.textContent = "Las contraseñas nuevas no coinciden. Revíselas e inténtelo de nuevo.";
                return;
            }

            if (passActual !== usuario.contrasena) {
                errorActual.style.display = 'block';
                errorActual.textContent = "La contraseña actual introducida no es válida.";
                return;
            }

            if (verificaContrasena()) {
                return;
            }

            // Actualizar datos en memoria
            usuario.contrasena = pass1;
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));

            let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados'));
            let index = usuariosRegistrados.findIndex(u => u.correo === usuario.correo);

            if (index !== -1) {
                usuariosRegistrados[index].contrasena = pass1;
                localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));
            }

            // Feedback visual y redirección
            btnConfirmar.style.backgroundColor = '#4CAF50';
            btnConfirmar.style.color = 'white';
            btnConfirmar.value = "¡Actualizada! ✅";
            btnConfirmar.disabled = true;

            // Redirigimos rápido (1 segundo es suficiente si el botón cambia)
            setTimeout(() => {
                window.location.href = "perfil.html";
            }, 1000);
        });
    }

    let inputContrasena_actual = document.getElementById('contrasena_actual');
    let btnVerPass1 = document.getElementById('btn_ver_contrasena1');
    if(inputContrasena_actual && btnVerPass1)
    {
        btnVerPass1.addEventListener('click', function() {
            // Si está en modo contraseña (oculta)...
            if (inputContrasena_actual.type === "password") {
                inputContrasena_actual.type = "text"; // La hacemos visible
                btnVerPass1.textContent = "Ocultar"; // Cambiamos el texto del botón
            } else {
                // Si ya estaba visible, la volvemos a ocultar
                inputContrasena_actual.type = "password";
                btnVerPass1.textContent = "Ver";
            }
        });
    }
    let inputContrasena = document.getElementById('contrasena');
    let btnVerPass2 = document.getElementById('btn_ver_contrasena2');
    if(inputContrasena && btnVerPass2)
    {
        btnVerPass2.addEventListener('click', function() {
            // Si está en modo contraseña (oculta)...
            if (inputContrasena.type === "password") {
                inputContrasena.type = "text"; // La hacemos visible
                btnVerPass2.textContent = "Ocultar"; // Cambiamos el texto del botón
            } else {
                // Si ya estaba visible, la volvemos a ocultar
                inputContrasena.type = "password";
                btnVerPass2.textContent = "Ver";
            }
        });
    }
});