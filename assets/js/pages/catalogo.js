function countCatalogCards() {
  const container = document.getElementById('tarjetaAnimal');
  const stat = document.getElementById('statTotal');
  if (!container || !stat) return;
  stat.textContent = String(container.children.length || 0);
}

document.addEventListener('DOMContentLoaded', () => {
  loadHTMLAndExecuteScripts('#header', 'components/_header.html');
  loadHTMLAndExecuteScripts('#footer', 'components/_footer.html');

  cargarContenidoDinamico();

  const container = document.getElementById('tarjetaAnimal');
  if (!container) return;

  // Actualizar contador cuando se inserten tarjetas dinámicamente
  const observer = new MutationObserver(() => countCatalogCards());
  observer.observe(container, { childList: true, subtree: false });

  // Primer render (por si ya hay contenido)
  countCatalogCards();
});

