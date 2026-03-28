# Web de adopción

## Componentes del Grupo
* **Oussama Ezzaim Driouch**
* **Beatriz Chaves Marrero**
* **Carlos Luis Miranda Hernández**
* **Adrian Robaina Mejías**

---

## Descripción del Proyecto
La web trata sobre la adopción de animales donde un usuario puede ver un catalogo un catalogo de diferentes animales, para cada animal podra acceder a su información como sexo, edad, especie, su historia y cómo llegó a la fundación además de varias fotos y videos de el, si se decanta por su adopcion puede mandar una solicitud de adopcion 

---

## Listado de Requisitos Funcionales
A continuación se detallan los requisitos que cumple la aplicación:

**RF-01 (Catálogo Interactivo)**: Galería de animales posibles a adoptar con filtrado por tipo y acceso a cada una de las fichas de los animales.  
**RF-02 (Ficha de animal)**: Visualización de posible animal a adoptar con detalles técnicos (nombre, género, especie, edad, tiempo en el centro, raza, peso, leve descripción y tasa de adopción).  
**RF-03 (Registro de usuario)**: Formulario que captura los datos del usuario (nombre, apellidos, fecha de nacimiento, DNI, dirección, teléfono, correo y contraseña) para habilitar funciones privadas.  
**RF-04 (Perfil)**: Página con información del usuario que incluye la funcionalidad para editar y actualizar sus datos personales.  
**RF-05 (Gestión de adopciones)**: Funcionalidad para adoptar y “desadoptar”, con ventana emergente de mensaje obligatorio (motivo de la acción) para los usuarios registrados.  
**RF-06 (Área personal)**: Sección donde el usuario registrado puede visualizar y gestionar sus animales adoptados.  
**RF-07 (Sección informativa)**: Página “Sobre nosotros” con descripción del centro, su ubicación, la cuenta bancaria y el horario de atención al público.  
**RF-08 (Reseñas)**: Página de reseñas de adoptantes previos.

---

## Mockups y Storyboard
* **Nombre del archivo (Mockups_Antiguos):** `mockups_Sprint0.pdf`
* **Nombre del archivo (Mockups_Nuevos):** `mockups_Sprint1.pdf`
* **Nombre del archivo (Storyboard):** `storyboard.pdf`
* **Ubicación:** `/docs`

---

## Listado de Páginas HTML y Mockups
**Página de inicio de la aplicación web:** `index.html`

| Archivo HTML          | Mockup que implementa  | Descripción / Notas                                                                                 |
|:----------------------|:-----------------------|:----------------------------------------------------------------------------------------------------|
| `index.html`          | *Pagina principal*     | Página principal de aterrizaje.                                                                     |
| `catalogo.html`       | *Catalogo*             | Donde se ven los diferentes animales disponibles.                                                   |
| `fichaAnimal.html`    | *Ficha animal*         | Donde se ve toda la información de un animal                                                        |
| `reseñas.html`        | *Finales Felices*      | Aqui se verá las reseñas de los usuarios que adoptaron                                              |
| `sobreNosotros.html`  | *Sobre nosotros*       | Página donde abarca toda la informacion de nuestra fundación                                        |
| `perfil.html`         | *Perfil*               | Página donde se ve la informacion del perfil de cada usuario                                        |
| `adopcion.html`       | *Adopción*             | Página que pregunta al usuario su motivo para querer adopatar el animal que quiere                  |
| `iniciarSension`      | *Iniciar Sesion*       | Página donde el usuario inicia sesión ingresando su correo electrónico y contraseña.                |
| `reiniciarContraseña` | *Reiniciar Contraseña* | Página donde el usuario puede recuperar o restablecer su contraseña mediante su correo electrónico. |
| `crearCuenta`         | *Crear Cuenta*         | Página donde el usuario puede registrarse creando una nueva cuenta con sus datos personales.        |
| `adoptados`           | *Adoptados*            | Página donde podrás ver tus mascotas adoptadas y gestionar su desadopción si lo deseas.             |        
| `anadirResena`        | *Añadir Reseña*        | Página donde puede añadir tu reseña.                                                                |   

---

## Archivos Templates (Plantillas)
Lista de fragmentos de código o plantillas reutilizables identificadas:

| Nombre del Archivo Template | Archivo(s) donde se carga/usa |
|:----------------------------|:------------------------------|
| `_header.html`              | Todas las paginas             |
| `_footer.html`              | Todas las páginas             |
| `_tarjetaAnimal.html`       | `index.html` `catalogo.html`  |
| `_fichaAnimal.html`         | `fichaAnimal.html`            |
| `_tarjeReseñas.html`        | `index.html` `reseñas.html`   |
| `_tarjeAdoptado.html`       | `adoptados.html`              |
| `_contador.html`            | `index.html`                  |

