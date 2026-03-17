document.addEventListener('DOMContentLoaded', () => {
  loadHTMLAndExecuteScripts('#header', 'components/_header.html');
  loadHTMLAndExecuteScripts('#footer', 'components/_footer.html');

  cargarContenidoDinamico();

  const btnAnadirResena = document.getElementById('btn_anadir_resena');
  if (!btnAnadirResena) return;

  btnAnadirResena.addEventListener('click', (event) => {
    if (!verificarRegistro()) {
      event.preventDefault();
      alert('¡Hola! Para contar tu historia, primero debes iniciar sesión.');
      window.location.href = 'iniciarSension.html';
    }
  });
});

