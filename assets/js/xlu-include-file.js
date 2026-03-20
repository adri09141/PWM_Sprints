// Caché global: Guarda los archivos HTML en memoria para no volver a descargarlos
const templateCache = new Map();
/**
 * Busca elementos con el atributo [xlu-include-file], descarga la plantilla HTML,
 * reemplaza las variables {{ nombre }} por los atributos data-nombre, y lo inyecta en el DOM.
 */
async function xLuIncludeFile() {
    const elements = document.querySelectorAll('[xlu-include-file]');

    if (elements.length === 0) return;

    const promises = Array.from(elements).map(async (el) => {
        const file = el.getAttribute("xlu-include-file");

        try {
            let content;
            // 1. CACHÉ: Si ya descargamos este molde antes, lo sacamos de la memoria
            if (templateCache.has(file)) {
                content = templateCache.get(file);
            } else {
                // Si es nuevo, lo pedimos al servidor y lo guardamos en la caché
                const response = await fetch(file);
                if (!response.ok) throw new Error(`Error ${response.status}`);
                content = await response.text();
                templateCache.set(file, content);
            }
            // 2. Buscamos cosas como {{ titulo }} en el HTML
            // y las cambiamos por el valor de data-titulo del elemento.
            const renderedContent = content.replace(/{{\s*([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ_]+)\s*}}/g, (match, variableName) => {
                const valorHTML = el.getAttribute(`data-${variableName}`);
                // Si no hay dato, usamos el diccionario por defecto
                return valorHTML !== null ? valorHTML : obtenerValorPorDefecto(variableName);
            });
            // 3. INYECCIÓN EN EL DOM: Convertimos el texto en HTML real
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = renderedContent;

            const parent = el.parentNode;
            while (tempDiv.firstChild) {
                parent.insertBefore(tempDiv.firstChild, el); // Metemos el contenido nuevo
            }
            parent.removeChild(el); // Borramos la etiqueta original que servía de ancla

        } catch (error) {
            console.error(`Error en ${file}`, error);
        }
    });

    await Promise.all(promises);
    // Recursividad: Por si un componente incluye a otro componente dentro
    if (document.querySelector('[xlu-include-file]')) {
        await xLuIncludeFile();
    }
}
/**
 * Carga un archivo HTML dentro de un contenedor y ejecuta sus scripts.
 * @param {string} selector - El ID o clase donde se va a inyectar (ej: '#header')
 * @param {string} sourceFile - La ruta del archivo (ej: 'components/_header.html')
 */
function loadHTMLAndExecuteScripts(selector, sourceFile) {
    fetch(sourceFile)
        .then(response => response.text())
        .then(html => {
            const container = document.querySelector(selector);
            container.innerHTML = html;

            executeScripts(container);
        })
        .catch(error => console.error('Error loading ' + sourceFile + ':', error));
}
/**
 * Extrae las etiquetas <script> de un HTML inyectado y las vuelve a insertar
 * en el <head> para que el navegador las ejecute de verdad.
 */
function executeScripts(container) {
    const scripts = container.querySelectorAll('script');
    scripts.forEach(script => {
        const scriptTag = document.createElement('script');

        if (script.src) {
            scriptTag.src = script.src;
        } else {
            scriptTag.textContent = script.textContent;
        }

        // Insert script tag into the document to ensure global execution context
        document.head.appendChild(scriptTag).parentNode.removeChild(scriptTag);
    });
}
/**
 * Lee la base de datos JSON y crea dinámicamente las tarjetas de animales,
 * reseñas y el contador en la página.
 * @param {number|null} limite - Cantidad máxima de elementos a mostrar (útil para la página de inicio)
 */
function cargarContenidoDinamico(limite = null) {
    fetch('assets/json/data.json')
        .then(response => response.json())
        .then(data => {
            let tarjeteResena = document.querySelector('#tarjetaResena');
            let tarjetaAnimal = document.querySelector('#tarjetaAnimal');
            let contenedorContador = document.querySelector('#contenedorContador');

            // Si hay límite, cortamos el array. Si no (null), usamos data.reseñas tal cual.
            const listaResenas = limite ? data.reseñas.slice(0, limite) : data.reseñas;
            const listaAnimales = limite ? data.animales.slice(0, limite) : data.animales;

            if (tarjeteResena) {
                listaResenas.forEach(item => {
                    // 1. Creamos un div normal
                    let div = document.createElement('div');

                    // 2. Le ponemos tu atributo para que llame al molde
                    div.setAttribute('xlu-include-file', 'components/_tarjetaResena.html');

                    // 3. Le pasamos los datos del JSON (usando 'item.nombre' como en tu JSON)
                    div.setAttribute('data-titulo', item.titulo || 'Sin título');
                    div.setAttribute('data-reseña', item.reseña || 'Sin texto');
                    div.setAttribute('data-nombre_perro', item.nombreAnimal || 'Desconocido');
                    div.setAttribute('data-foto_perro', item.foto || 'https://placehold.co/300x300?text=Sin+Foto');

                    // 4. Lo metemos en la sección
                    tarjeteResena.appendChild(div);
                });
            }
            if (tarjetaAnimal) {
                listaAnimales.forEach(item => {
                    let div = document.createElement('div');
                    div.setAttribute('xlu-include-file', 'components/_tarjetaAnimal.html');
                    div.setAttribute('data-id', item.id); // ¡VITAL para el enlace!
                    div.setAttribute('data-nombre', item.nombre || 'Sin título');
                    div.setAttribute('data-especie', item.especie || 'Sin título');
                    div.setAttribute('data-edad', item.edad || 'Sin título');
                    div.setAttribute('data-foto1', item.foto1 || 'Sin foto');
                    tarjetaAnimal.appendChild(div);

                })

            }

            if (contenedorContador) {
                let div = document.createElement('div');
                div.setAttribute('xlu-include-file', 'components/_contador.html');

                let contadorStr = String(data.contador || 0).padStart(5, '0');

                div.setAttribute('data-digito1', contadorStr[0]);
                div.setAttribute('data-digito2', contadorStr[1]);
                div.setAttribute('data-digito3', contadorStr[2]);
                div.setAttribute('data-digito4', contadorStr[3]);
                div.setAttribute('data-digito5', contadorStr[4]);

                contenedorContador.appendChild(div);
            }

            // Inyectamos los datos en los moldes
            xLuIncludeFile();
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}
/**
 * Devuelve un texto por defecto si al JSON le falta algún dato.
 * Evita que salgan "undefined" o etiquetas rotas en la web.
 */
function obtenerValorPorDefecto(key) {
    const defaults = {
        // Tarjeta Animal
        'nombre': 'SIN NOMBRE', // Puse mayúsculas para que se vea igual a tu foto 1
        'especie': 'Desconocida',
        'edad': 'Desconocida',

        // Tarjeta Reseña
        'titulo': 'Sin Título',
        'reseña': '“Reseña adoptante Reseña adoptante Reseña adoptante Reseña adoptante Reseña adoptante Reseña adoptante Reseña adoptante Reseña adoptante Reseña adoptante Reseña adoptante”',
        'nombre_perro': 'Sin nombre',

        // Ficha Animal
        'raza': 'Desconocida',
        'meses': '0',
        'sexo': 'Desconocido',
        'peso': '0',
        'tasa': '0€',
        'descripcion': 'Sin descripción',

        // Contador
        'digito1': '0',
        'digito2': '0',
        'digito3': '0',
        'digito4': '0',
        'digito5': '0'
    };

    return defaults[key] || '';
}