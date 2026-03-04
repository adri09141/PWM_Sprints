document.addEventListener('DOMContentLoaded', function() {
    const formulario_registro = document.getElementById('formulario_registro');

    if (formulario_registro) {
        formulario_registro.addEventListener('submit', function(evento) {
            evento.preventDefault();

            let mensajeError = document.getElementById('mensaje_error');
            let cajaFisicaFecha = document.getElementById('fecha_nacimiento');
            let fechaInput = cajaFisicaFecha.value;

            if (!fechaInput) {
                mensajeError.style.display = 'block';
                mensajeError.textContent = "Por favor, introduce una fecha.";
                return;
            }

            let fechaActual = new Date();
            fechaActual.setHours(0, 0, 0, 0);
            let fechaLimpia = new Date(fechaInput);

            let fechaMayorEdad = new Date(fechaLimpia);
            fechaMayorEdad.setFullYear(fechaMayorEdad.getFullYear() + 18);

            if (fechaLimpia > fechaActual) {
                mensajeError.style.display = 'block';
                mensajeError.textContent = "¡No puedes nacer en el futuro, jefe!";
            } else if (fechaMayorEdad > fechaActual) {
                mensajeError.style.display = 'block';
                mensajeError.textContent = "Lo sentimos, los menores de 18 años no pueden adoptar.";
            } else {
                mensajeError.style.display = 'none';
                window.location.href = 'index.html';
            }
        });
    }
});