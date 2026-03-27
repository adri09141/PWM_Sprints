/**
 * Cuenta el número de tarjetas renderizadas en el contenedor de animales
 * y actualiza el contador visual en la interfaz.
 */
function countCatalogCards() {
  const container = document.getElementById('tarjetaAnimal');
  const stat = document.getElementById('statTotal');
  // Si no existe el contenedor o el contador en esta página, no hacemos nada
  if (!container || !stat) return;
  // Actualizamos el texto con el número de hijos (tarjetas) que tiene el contenedor
  stat.textContent = String(container.children.length || 0);
}

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. CARGA DE COMPONENTES BÁSICOS ---
  loadHTMLAndExecuteScripts('#header', 'components/_header.html');
  loadHTMLAndExecuteScripts('#footer', 'components/_footer.html');
  // --- 2. CARGA DE CONTENIDO DINÁMICO CON FILTRO---
  const filtro = document.getElementById('filtro');

  if (filtro) {
    cargarContenidoDinamico();
    filtro.addEventListener('change', (event) => {
      const target = event.target.value;
      cargarContenidoDinamico(null, target);
    })
  }
  // --- 3. CONFIGURACIÓN DEL VIGILANTE (MUTATION OBSERVER) ---
  const container = document.getElementById('tarjetaAnimal');
  if (!container) return;// Si no estamos en la página del catálogo, cortamos aquí

  // Creamos un "vigilante" que ejecutará countCatalogCards()
  // cada vez que detecte un cambio en la estructura del contenedor
  const observer = new MutationObserver(() => countCatalogCards());
  // Le decimos al vigilante qué mirar: las etiquetas hijas directas (childList)
  observer.observe(container, { childList: true, subtree: false });
  // --- 4. PRIMER RENDERIZADO ---
  // Llamamos a la función una vez al inicio por si ya había tarjetas estáticas en el HTML
  countCatalogCards();
});

