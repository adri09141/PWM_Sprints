// FUNCIÓN 1: Solo carga los datos
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

// FUNCIÓN 2: Solo maneja el guardado de la reseña
function prepararGuardadoResena() {
    // 1. Apuntamos al FORMULARIO, no al botón
    let formResena = document.getElementById('formulario_resena');

    if (formResena) {
        formResena.addEventListener('submit', (evento) => {
            // 2. ¡Freno de mano para que no recargue la página!
            evento.preventDefault();

            let nombre_mascota = document.getElementById('nombre_mascota').value;
            let valoracion = document.getElementById('valoracion').value;
            let titulo_resena = document.getElementById('titulo_resena').value;
            let descripcion_resena = document.getElementById('descripcion_resena').value;
            let foto_mascota = document.getElementById('foto_mascota').value;

            // Creamos el objeto
            let nuevoResena = {
                nombre_mascota: nombre_mascota,
                valoracion: valoracion,
                titulo_resena: titulo_resena,
                descripcion_resena: descripcion_resena,
                foto_mascota: foto_mascota
            };

            // Guardamos en la memoria
            let resenas = JSON.parse(localStorage.getItem('reseñasNuevasPorRevisar')) || [];
            resenas.push(nuevoResena);
            localStorage.setItem('reseñasNuevasPorRevisar', JSON.stringify(resenas));

            alert("¡Historia guardada con éxito, jefe!");
            window.location.href = "index.html";
        });
    }
}