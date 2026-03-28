document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CARGA DE COMPONENTES ---
    loadHTMLAndExecuteScripts('#header', 'components/_header.html');
    loadHTMLAndExecuteScripts('#footer', 'components/_footer.html');
});

// --- 2. LÓGICA DE INTERFAZ (Contador de caracteres) ---
const textarea = document.getElementById('mensaje');
const charCount = document.getElementById('charCount');
// Comprobamos que existan en esta página para no generar errores
textarea.addEventListener('input', () => {
    const n = textarea.value.length;
    charCount.textContent = n + ' caracter' + (n === 1 ? '' : 'es');
});

// --- 3. VALIDACIÓN DE SESIÓN (Protección de ruta) ---
const formAdopcion = document.getElementById('formulario_adopcion');
let usuarioMemoria = JSON.parse(localStorage.getItem('usuarioLogueado'));
// Si intenta entrar a adoptar sin cuenta, lo mandamos al login
if (!usuarioMemoria) { alert("Por favor, inicie sesión para poder continuar."); }
// --- 4. ENVÍO DEL FORMULARIO DE ADOPCIÓN ---
if (formAdopcion && usuarioMemoria) {
    formAdopcion.addEventListener('submit', function(e) {
        e.preventDefault();
        // Validación de longitud mínima
        if(textarea.value.trim().length < 50) {
            alert("Queremos conocerte mejor. Escribe al menos 50 caracteres.");
            return;
        }
        // Feedback visual: Bloqueamos el botón y cambiamos el texto
        let btnEnviar = document.getElementById('enviar');
        btnEnviar.textContent = "¡Solicitud Enviada! ✅";
        btnEnviar.disabled = true;
        // Redirección al inicio tras 1 segundo
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    });
}
