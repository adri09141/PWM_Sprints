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

async function xLuIncludeFile() {
    let z = document.getElementsByTagName("*");

    for (let i = 0; i < z.length; i++) {
        if (z[i].getAttribute("xlu-include-file")) {
            let a = z[i].cloneNode(false);
            let file = z[i].getAttribute("xlu-include-file");

            try {
                let response = await fetch(file);
                if (response.ok) {

                    let content = await response.text();

                    if (file === "_tarjetaAnimal.html") {
                        let articleData = {
                            nombre: z[i].getAttribute("data-nombre") || 'Sin nombre',
                            especie: z[i].getAttribute("data-especie") || 'Desconocida',
                            edad: z[i].getAttribute("data-edad") || 'Desconocida'
                        };

                        content = content.replace(/{{nombre}}/g, articleData.nombre)
                                        .replace(/{{especie}}/g, articleData.especie)
                                        .replace(/{{edad}}/g, articleData.edad);
                    }
                    if (file === "_tarjetaReseña.html") {
                        let articleData = {
                            titulo: z[i].getAttribute("data-titulo") || 'Sin nombre',
                            reseña: z[i].getAttribute("data-reseña") || 'Desconocida',
                            n_p: z[i].getAttribute("data-nombre_perro") || 'Desconocida'
                        };

                        content = content.replace(/{{titulo}}/g, articleData.titulo)
                            .replace(/{{reseña}}/g, articleData.reseña)
                            .replace(/{{nombre_perro}}/g, articleData.n_p);
                    }
                    else if (file.includes("_fichaAnimal.html")) {
                        let fichaData = {
                            nombre: z[i].getAttribute("data-nombre") || 'Sin nombre',
                            especie: z[i].getAttribute("data-especie") || 'Desconocida',
                            raza: z[i].getAttribute("data-raza") || 'Desconocida',
                            edad: z[i].getAttribute("data-edad") || '0',
                            meses: z[i].getAttribute("data-meses") || '0',
                            sexo: z[i].getAttribute("data-sexo") || 'Desconocido',
                            peso: z[i].getAttribute("data-peso") || '0',
                            tasa: z[i].getAttribute("data-tasa") || '0€',
                            descripcion: z[i].getAttribute("data-descripcion") || 'Sin descripción'
                        };

                        content = content.replace(/{{nombre}}/g, fichaData.nombre)
                            .replace(/{{especie}}/g, fichaData.especie)
                            .replace(/{{raza}}/g, fichaData.raza)
                            .replace(/{{edad}}/g, fichaData.edad)
                            .replace(/{{meses}}/g, fichaData.meses)
                            .replace(/{{sexo}}/g, fichaData.sexo)
                            .replace(/{{peso}}/g, fichaData.peso)
                            .replace(/{{tasa}}/g, fichaData.tasa)
                            .replace(/{{descripcion}}/g, fichaData.descripcion);
                    }
                    a.removeAttribute("xlu-include-file");
                    //a.innerHTML = await response.text();
                    a.innerHTML = content;
                    z[i].parentNode.replaceChild(a, z[i]);
                    xLuIncludeFile();
                }
            } catch (error) {
                console.error("Error fetching file:", error);
            }

            return;
        }
    }
}

