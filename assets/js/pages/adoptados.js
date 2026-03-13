document.addEventListener('DOMContentLoaded', () => {
  loadHTMLAndExecuteScripts('#header', 'components/_header.html');
  loadHTMLAndExecuteScripts('#footer', 'components/_footer.html');

  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
  const contenedor = document.getElementById('contenido-adoptados');

  // Obtener animales adoptados del usuario (ajusta según tu estructura de datos)
  const adoptados = usuario?.animalesAdoptados || usuario?.adoptados || [];

  document.getElementById('statNum').textContent = adoptados.length || '0';

  if (!adoptados.length) {
    contenedor.innerHTML = `
      <div class="adoptados-vacio">
        <div class="vacio-icono">🐾</div>
        <p>Todavía no has adoptado ningún animal.<br>¡Tu hogar está esperando a alguien especial!</p>
        <a href="catalogo.html">Ver animales disponibles →</a>
      </div>`;
    return;
  }

  // Si hay adoptados, los mostramos
  fetch('assets/json/data.json')
          .then(r => r.json())
          .then(data => {
            const grid = document.createElement('div');
            grid.className = 'adoptados-grid';

            adoptados.forEach(id => {
              const animal = data.animales.find(a => a.id == id);
              if (!animal) return;

              grid.innerHTML += `
          <a href="fichaAnimal.html?id=${animal.id}" class="tarjeta-adoptado">
            <div class="tarjeta-foto">
              <img src="${animal.foto1}" alt="${animal.nombre}" loading="lazy">
            </div>
            <div class="tarjeta-info">
              <h3 class="tarjeta-nombre">${animal.nombre}</h3>
              <p class="tarjeta-raza">${animal.raza}</p>
              <div class="tarjeta-meta">
                <span class="tarjeta-chip">${animal.edad} años</span>
                <span class="tarjeta-chip">${animal.sexo}</span>
              </div>
            </div>
          </a>`;
            });

            contenedor.appendChild(grid);
          })
          .catch(() => {
            contenedor.innerHTML = '<p style="color:rgba(92,64,51,0.5);font-size:13px;">Error al cargar los datos.</p>';
          });
});
