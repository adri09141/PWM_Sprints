# Web de adopción

## Componentes del Grupo
* **Oussama Ezzaim Driouch**
* **Beatriz Chaves Marrero**
* **Carlos Luis Miranda Hernández**
* **Adrian Robaina Mejías**

---

## Descripción del Proyecto
La web trata sobre la adopción de animales donde un usuario puede ver un catálogo de diferentes animales. Para cada animal, podrá acceder a su información detallada como sexo, edad, especie, su historia y cómo llegó a la fundación, además de varias fotos de él. Si se decanta por su adopción, puede mandar una solicitud de adopción a través de la plataforma.

*Nota: El proyecto ha sido migrado a una Single Page Application (SPA) utilizando **Angular** para el Frontend y **Firebase** para el Backend y Base de Datos.*

---

## Listado de Requisitos Funcionales
A continuación se detallan los requisitos que cumple la aplicación:

**RF-01 (Catálogo Interactivo)**: Galería de animales posibles a adoptar con filtrado por tipo y acceso a cada una de las fichas de los animales.  
**RF-02 (Ficha de animal)**: Visualización de posible animal a adoptar con detalles técnicos (nombre, género, especie, edad, tiempo en el centro, raza, peso y leve descripción).  
**RF-03 (Registro de usuario)**: Formulario que captura los datos del usuario (nombre, apellidos, fecha de nacimiento, DNI, dirección, teléfono, correo y contraseña) para habilitar funciones privadas.  
**RF-04 (Perfil)**: Página con información del usuario que incluye la funcionalidad para editar y actualizar sus datos personales.  
**RF-05 (Gestión de adopciones)**: Funcionalidad para adoptar y “desadoptar”, con ventana emergente de mensaje obligatorio (motivo de la acción) para los usuarios registrados.  
**RF-06 (Área personal)**: Sección donde el usuario registrado puede visualizar y gestionar sus animales adoptados.  
**RF-07 (Sección informativa)**: Página “Sobre nosotros” con descripción del centro, su ubicación, la cuenta bancaria y el horario de atención al público.  
**RF-08 (Reseñas)**: Página de reseñas de adoptantes previos.

---

## Mockups, Storyboard y Evolución
* **Nombre del archivo (Mockups_Antiguos):** `mockups_Sprint0.pdf`
* **Nombre del archivo (Mockups_Nuevos):** `mockups_Sprint1.pdf`
* **Nombre del archivo (Storyboard):** `storyboard.pdf`
* **Ubicación:** `/docs`
* **Evolución del Proyecto (Trello):** https://trello.com/invite/b/6981e95a94e63f69bf8a9a14/ATTIab9077f1ea78544ba7aae94d52fa7bf36BE69112/pwm-pract

---

## Estructura del Código y Rutas (Pages)
Al migrar a Angular, la navegación se gestiona mediante el enrutador (`app.routes.ts`).

**Página de inicio de la aplicación web:** `localhost:4200/` (Componente Inicio)

| Ruta Angular (URL)    | Componente (Page)      | Descripción / Notas                                                                                 |
|:----------------------|:-----------------------|:----------------------------------------------------------------------------------------------------|
| `/`                   | *Inicio*               | Página principal de aterrizaje.                                                                     |
| `/catalogo`           | *Catalogo*             | Donde se ven los diferentes animales disponibles.                                                   |
| `/catalogo/:id`       | *FichaAnimalPage*      | Donde se ve toda la información detallada de un animal específico.                                  |
| `/finalesFelices`     | *Finales Felices*      | Aquí se verán las reseñas de los usuarios que adoptaron.                                            |
| `/sobreNosotros`      | *Sobre nosotros*       | Página que abarca toda la información de nuestra fundación.                                         |
| `/perfil`             | *Perfil*               | Página donde se ve la información del perfil de cada usuario.                                       |
| `/adopcion/:id`       | *Adopcion*             | Página que pregunta al usuario su motivo para querer adoptar el animal que quiere.                  |
| `/IniciarSesion`      | *Iniciar Sesion*       | Página donde el usuario inicia sesión ingresando su correo electrónico y contraseña.                |
| `/cambioPassword`     | *Cambio Password*      | Página donde el usuario puede restablecer su contraseña.                                            |
| `/crearCuenta`        | *Crear Cuenta*         | Página donde el usuario puede registrarse creando una nueva cuenta con sus datos personales.        |
| `/adoptados`          | *Adoptados*            | Página donde podrás ver tus mascotas adoptadas y gestionar su desadopción si lo deseas.             |        
| `/AnadirResena`       | *Añadir Reseña*        | Página donde el usuario puede añadir su reseña.                                                     |   

---

## Componentes Reutilizables (Templates)
En Angular, las plantillas repetitivas se han convertido en **Componentes Independientes**:

| Nombre del Componente       | Archivo(s) / Vistas donde se carga o usa |
|:----------------------------|:-----------------------------------------|
| `HeaderComponent`           | Todas las páginas (Layout principal)     |
| `FooterComponent`           | Todas las páginas (Layout principal)     |
| `TarjetaAnimalComponent`    | `/` (Inicio) y `/catalogo`               |
| `TarjetaResenaComponent`    | `/` (Inicio) y `/finalesFelices`         |
| `ContadorComponent`         | `/` (Inicio) y `/sobreNosotros`          |

---

## Estructura de Datos (Firebase Firestore)
Nuestra base de datos NoSQL en Firebase está organizada en las siguientes colecciones:

* **`usuarios`**: Almacena los datos personales, UID de autenticación, el array de IDs de los animales que ha adoptado (`animalesAdoptados`) y su número total de adopciones.
* **`animales`**: Contiene la información técnica de cada mascota (edad, especie, descripción, raza, rutas de las fotos, etc.) y si ha sido adoptado.
* **`resenas`**: Guarda los testimonios de los adoptantes.
