document.addEventListener('DOMContentLoaded', function() {

    // Buscamos el botón en el HTML
    const formulario_registro = document.getElementById('formulario_registro');

    // Solo añadimos el evento si el botón existe en la página actual
    if (formulario_registro) {
        formulario_registro.addEventListener('submit', function(evento) {
            evento.preventDefault(); //Evitamos que se recarge sola
            let mensajeError = document.getElementById('mensaje_error');
            let fechaInput = document.getElementById('fecha_nacimiento').value;
            if (!fechaInput) {
                mensajeError.style.display = 'block';
                mensajeError.textContent = "Por favor, introduce una fecha.";
                return;
            }
            let fechaActual = new Date();
            let fechaLimpia = new Date(fechaInput)
            // 2. Comprobar si son iguales y no están vacías
            if (fechaLimpia > fechaActual) {
                mensajeError.style.display = 'block'; // Mostrar error
                mensajeError.textContent = "¡No puedes nacer en el futuro, jefe!";
            } else {
                mensajeError.style.display = 'none';
                window.location.href = 'index.html'; // Redirigir
            }
        });
    }
});