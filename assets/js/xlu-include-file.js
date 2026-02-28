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

