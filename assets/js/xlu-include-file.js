// https://stackoverflow.com/questions/40162907/w3includehtml-sometimes-includes-twice
/*
function xLuIncludeFile() {
    let z, i, a, file, xhttp;

    z = document.getElementsByTagName("*");

    for (i = 0; i < z.length; i++) {
        if (z[i].getAttribute("xlu-include-file")) {
            a = z[i].cloneNode(false);
            file = z[i].getAttribute("xlu-include-file");
            xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    a.removeAttribute("xlu-include-file");
                    a.innerHTML = xhttp.responseText;
                    z[i].parentNode.replaceChild(a, z[i]);
                    xLuIncludeFile();
                }
            }

            // false makes the send operation synchronous, which solves a problem
            // when using this function in short pages with Chrome. But it is
            // deprecated on the main thread due to its impact on responsiveness.
            // This call may end up throwing an exception someday.

            xhttp.open("GET", file, false);
            xhttp.send();

            return;
        }
    }
}
*/

const templateCache = new Map();

async function xLuIncludeFile() {
    const elements = document.querySelectorAll('[xlu-include-file]');

    if (elements.length === 0) return;

    const promises = Array.from(elements).map(async (el) => {
        const file = el.getAttribute("xlu-include-file");

        try {
            let content;
            if (templateCache.has(file)) {
                content = templateCache.get(file);
            } else {
                const response = await fetch(file);
                if (!response.ok) throw new Error(`Error ${response.status}`);
                content = await response.text();
                templateCache.set(file, content);
            }

            const renderedContent = content.replace(/{{\s*([a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ_]+)\s*}}/g, (match, variableName) => {

                const valorHTML = el.getAttribute(`data-${variableName}`);

                return valorHTML !== null ? valorHTML : obtenerValorPorDefecto(variableName);
            });

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = renderedContent;

            const parent = el.parentNode;
            while (tempDiv.firstChild) {
                parent.insertBefore(tempDiv.firstChild, el);
            }
            parent.removeChild(el);

        } catch (error) {
            console.error(`Error en ${file}`, error);
        }
    });

    await Promise.all(promises);

    if (document.querySelector('[xlu-include-file]')) {
        await xLuIncludeFile();
    }
}
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
function cargarContenidoDinamico() {
    fetch('assets/json/data.json')
        .then(response => response.json())
        .then(data => {
            let tarjeteResena = document.querySelector('#tarjetaResena');
            let tarjetaAnimal = document.querySelector('#tarjetaAnimal');
            if (!tarjeteResena || !tarjetaAnimal) {
                console.error('No se encontró #tarjeteResena o #tarjetaAnimal en el DOM');
                return;
            }
            if(tarjeteResena) {
                data.reseñas.forEach(item => {
                    // 1. Creamos un div normal
                    let div = document.createElement('div');

                    // 2. Le ponemos tu atributo para que llame al molde
                    div.setAttribute('xlu-include-file', 'components/_tarjetaResena.html');

                    // 3. Le pasamos los datos del JSON (usando 'item.nombre' como en tu JSON)
                    div.setAttribute('data-titulo', item.titulo || 'Sin título');
                    div.setAttribute('data-reseña', item.reseña || 'Sin texto');
                    div.setAttribute('data-nombre_perro', item.nombre || 'Desconocido');

                    // 4. Lo metemos en la sección
                    tarjeteResena.appendChild(div);
                });
            }
            if(tarjetaAnimal) {
                data.animales.forEach(item => {
                    let div = document.createElement('div');
                    div.setAttribute('xlu-include-file', 'components/_tarjetaAnimal.html');
                    div.setAttribute('data-nombre', item.nombre || 'Sin título');
                    div.setAttribute('data-especie', item.especie || 'Sin título');
                    div.setAttribute('data-edad', item.edad || 'Sin título');
                    tarjetaAnimal.appendChild(div);
                })

            }
            // Inyectamos los datos en los moldes
            xLuIncludeFile();
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
}
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
        'descripcion': 'Sin descripción'
    };

    return defaults[key] || '';
}

