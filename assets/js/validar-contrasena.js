document.addEventListener('DOMContentLoaded', function() {

    const btnConfirmar = document.getElementById('btn_confirmar');

    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function() {
            let passActual = document.getElementById('contrasena_actual').value;
            let pass1 = document.getElementById('contrasena_nueva1').value;
            let pass2 = document.getElementById('contrasena_nueva2').value;
            let mensajeError = document.getElementById('mensaje_error');

            // Obtener usuario de la sesión
            let usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

            // 1. ¿Están vacías?
            if (passActual === "" || pass1 === "" || pass2 === "") {
                mensajeError.style.display = 'block';
                mensajeError.textContent = "¡Ey! Las contraseñas no pueden estar vacías.";
                return; // Cortamos la ejecución aquí
            }

            // 2. ¿Son diferentes?
            if (pass1 !== pass2) {
                mensajeError.style.display = 'block';
                mensajeError.textContent = "Las contraseñas no coinciden, jefe.";
                return; // Cortamos la ejecución aquí
            }

            let passEnMemoria = usuario.contrasena;
            if (passActual !== passEnMemoria) {
                mensajeError.style.display = 'block';
                mensajeError.textContent = "La contraseña actual es incorrecta.";
                return;
            }

            usuario.contrasena = pass1;
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));

            let usuariosRegistrados = JSON.parse(localStorage.getItem('usuariosRegistrados'));
            let index = usuariosRegistrados.findIndex(u => u.correo === usuario.correo);

            if (index !== -1) {
                usuariosRegistrados[index].contrasena = pass1;
                localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));
            }

            alert("¡Contraseña actualizada con éxito!");
            window.location.href = "perfil.html";

        });
    }
});