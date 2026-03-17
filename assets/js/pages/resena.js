/**
 * Carga únicamente los datos básicos del usuario logueado (nombre, apellidos y correo).
 * Ideal para autocompletar formularios secundarios sin saturar la memoria.
 */
function cargarDatosGuardadosEnEspecifico() {
    let usuarioMemoria = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioMemoria) return;

    fetch('assets/json/data.json')
        .then(res => res.json())
        .then(data => {
            let misDatosCompletos = data.usuarios.find(u => u.correo === usuarioMemoria.correo);
            if (misDatosCompletos) {
                document.getElementById('nombre').value = misDatosCompletos.nombre || "";
                document.getElementById('correo').value = misDatosCompletos.correo || "";
                document.getElementById('apellidos').value = misDatosCompletos.apellidos || "";
            } else {
                document.getElementById('nombre').value = usuarioMemoria.nombre || "";
                document.getElementById('correo').value = usuarioMemoria.correo || "";
                document.getElementById('apellidos').value = usuarioMemoria.apellidos || "";
            }
        })
        .catch(error => console.error("Error al cargar los datos del JSON:", error));
}

/**
 * Maneja el evento de envío del formulario de reseñas.
 * Recoge los datos y guarda la reseña en la "cola de revisión" del LocalStorage.
 */
function prepararGuardadoResena() {
    // 1. Apuntamos al FORMULARIO, no al botón
    let formResena = document.getElementById('formulario_resena');

    if (formResena) {
        formResena.addEventListener('submit', (evento) => {
            // --- 2. PREVENCIÓN DE RECARGA ---
            evento.preventDefault();
            // --- 3. RECOPILACIÓN DE DATOS ---
            let nombre_mascota = document.getElementById('nombre_mascota').value;
            let valoracion = document.getElementById('valoracion').value;
            let titulo_resena = document.getElementById('titulo_resena').value;
            let descripcion_resena = document.getElementById('descripcion_resena').value;
            let foto_mascota = document.getElementById('foto_mascota').value;
            // --- 4. CREACIÓN DEL OBJETO ---
            let nuevoResena = {
                nombre_mascota: nombre_mascota,
                valoracion: valoracion,
                titulo_resena: titulo_resena,
                descripcion_resena: descripcion_resena,
                foto_mascota: foto_mascota
            };

            // --- 5. GUARDADO EN COLA DE REVISIÓN (LocalStorage) ---
            // Rescatamos la lista existente (o creamos una vacía si es la primera), añadimos y guardamos
            let resenas = JSON.parse(localStorage.getItem('reseñasNuevasPorRevisar')) || [];
            resenas.push(nuevoResena);
            localStorage.setItem('reseñasNuevasPorRevisar', JSON.stringify(resenas));
            /// --- 6. FEEDBACK AL USUARIO Y REDIRECCIÓN ---
            alert("¡Historia guardada con éxito, jefe!");
            window.location.href = "index.html";
        });
    }
}