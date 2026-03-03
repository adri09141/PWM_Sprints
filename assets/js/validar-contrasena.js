// Esperamos a que el HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {

    // Buscamos el botón en el HTML
    const btnConfirmar = document.getElementById('btn_confirmar');

    // Solo añadimos el evento si el botón existe en la página actual
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function() {
            // 1. Obtener los valores
            let pass1 = document.getElementById('contrasena_nueva1').value;
            let pass2 = document.getElementById('contrasena_nueva2').value;
            let mensajeError = document.getElementById('mensaje_error');

            // 2. Comprobar si son iguales y no están vacías
            if (pass1 === pass2 && pass1 !== "") {
                mensajeError.style.display = 'none';
                window.location.href = 'perfil.html'; // Redirigir
            } else {
                mensajeError.style.display = 'block'; // Mostrar error
            }
        });
    }
});