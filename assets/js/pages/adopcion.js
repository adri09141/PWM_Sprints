document.addEventListener('DOMContentLoaded', () => {
    loadHTMLAndExecuteScripts('#header', 'components/_header.html');
    loadHTMLAndExecuteScripts('#footer', 'components/_footer.html');
});

// Contador de caracteres
const textarea = document.getElementById('mensaje');
const charCount = document.getElementById('charCount');
textarea.addEventListener('input', () => {
    const n = textarea.value.length;
    charCount.textContent = n + ' caracter' + (n === 1 ? '' : 'es');
});

// Lógica de envío original
const formAdopcion = document.getElementById('formulario_adopcion');
let usuarioMemoria = JSON.parse(localStorage.getItem('usuarioLogueado'));
if (!usuarioMemoria) { alert("Debe iniciar sesión"); }

if (formAdopcion && usuarioMemoria) {
    formAdopcion.addEventListener('submit', function(e) {
        e.preventDefault();
        if(textarea.value.trim().length < 50) {
            alert("Queremos conocerte mejor. Escribe al menos 50 caracteres.");
            return;
        }
        let btnEnviar = document.getElementById('enviar');
        btnEnviar.textContent = "¡Solicitud Enviada! ✅";
        btnEnviar.disabled = true;
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    });
}
