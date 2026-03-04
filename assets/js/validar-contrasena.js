document.addEventListener('DOMContentLoaded', function() {

    const btnConfirmar = document.getElementById('btn_confirmar');

    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function() {
            let pass1 = document.getElementById('contrasena_nueva1').value;
            let pass2 = document.getElementById('contrasena_nueva2').value;
            let mensajeError = document.getElementById('mensaje_error');

            // 1. ¿Están vacías?
            if (pass1 === "" || pass2 === "") {
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

            // 3. Si llega aquí, es que no están vacías y son iguales
            mensajeError.style.display = 'none';
            window.location.href = 'perfil.html'; // Redirigir
        });
    }
});