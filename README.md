# eDomArgentina - Tu Tienda Online

Este proyecto representa el desarrollo de un sitio web de e-commerce dinámico e interactivo, creado como proyecto final de un curso de Front-End. Combina HTML semántico, estilos avanzados con CSS (incluyendo Flexbox y Grid) y funcionalidades interactivas con JavaScript. Se destaca por la carga dinámica de productos desde un archivo JSON (simulando una API REST) y la gestión de un carrito de compras persistente.

## Características Principales

* **Estructura HTML Semántica**: Utilización de etiquetas como `<header>`, `<nav>`, `<main>`, `<section>`, y `<footer>` para una estructura clara, accesible y optimizada.
* **Diseño Responsivo**: Adaptabilidad a diferentes tamaños de pantalla implementada eficientemente con **Flexbox** y **CSS Grid** para la disposición de productos y reseñas, y **Media Queries** para el diseño general y el formulario de contacto.
* **Estilos Atractivos con CSS**: Uso de un archivo CSS externo (`style2.css`) para aplicar estilos coherentes y atractivos, incluyendo la integración de fuentes de Google Fonts y propiedades de `background` en secciones clave para una experiencia visual mejorada.
* **Interactividad con JavaScript (`script.js`)**:
    * **Carga Dinámica de Productos**: Los productos se cargan de forma asíncrona y dinámica desde el archivo `products.json` local utilizando la **Fetch API**, simulando la interacción con una API REST para una visualización flexible de productos sin recargar la página.
    * **Carrito de Compras Dinámico**: Permite a los usuarios añadir, eliminar y ajustar la cantidad de productos en el carrito en tiempo real.
    * **Persistencia del Carrito**: El estado del carrito se guarda en `localStorage` del navegador, asegurando que los productos seleccionados no se pierdan al recargar o cerrar la página.
    * **Contador de Ítems en Carrito**: Actualización en tiempo real del número total de productos en el carrito, visible en la barra de navegación.
    * **Modal de Login/Registro**: Implementación de un modal centralizado para el acceso de usuarios, con pestañas para alternar entre las funcionalidades de "Iniciar Sesión" y "Registrarse".
    * **Registro de Usuarios (Simulado)**: Permite a los nuevos usuarios registrarse con nombre de usuario, email y contraseña. La información de registro se almacena en `localStorage` (para propósitos de demostración, **no es seguro para un entorno de producción real**).
    * **Inicio de Sesión (Simulado)**: Los usuarios registrados pueden "iniciar sesión" utilizando las credenciales guardadas en `localStorage`.
    * **Validación de Formularios**: Validación básica de campos en los formularios de contacto y registro para asegurar la entrada de datos correctos.
    * **Menús Desplegables**: Funcionalidad de dropdowns para la navegación (ej. "Mi Cuenta" y "Carrito") para una mejor usabilidad.
* **Formulario de Contacto Funcional**: Integrado con `Formspree` para el manejo de envíos de datos (requiere configurar un `YOUR_FORM_ID` en el HTML para que sea completamente funcional).
* **SEO y Accesibilidad Básicos**: Inclusión de atributos `alt` en imágenes y metaetiquetas descriptivas en el `head` del HTML para optimización básica para motores de búsqueda y mejora de la accesibilidad.
* **Contenido Multimedia**: Inclusión de imágenes de productos y logos relevantes para una experiencia de usuario rica.

## Tecnologías Utilizadas

* **HTML5**
* **CSS3** (incluyendo Flexbox, Grid, Media Queries)
* **JavaScript ES6+**
* **Fetch API** (para la carga de `products.json`)
* **localStorage**
* **Google Fonts**
* **Formspree** (para el formulario de contacto)

## Estructura del Proyecto

eDomArgentina/
├── EntregafinalLDP.html
├── script.js
├── style2.css
├── products.json
├── favicon.ico
├── eDom logo.png
├── hero-bg.jpg
├── insta png.png
├── telegram-logo-8.png
├── CARRITO ECOM.jpg
├── ABONAR.jpg
├── LOGISTICA.jpg
├── TIEMPO.jpg
├── FAMILIA.jpg
├── RUN.jpg
├── FREE SHIPING.jpg
├── ATENCION TEL.jpg
├── VIRTUAL ASIST.jpg
└── /* Carpeta con imágenes de productos */
├── ARIEL 800.jpg
├── SKIP CONCENTRADO.jpg
├── ARIEL CONCENTRADO DESCRIPCION.webp
├── ALA CONCENTRADO.JPG
├── COMFORT DP FRENTE.jpg
├── WOOLITE BEBE INFO X 450.webp
├── COMFORT ROSA.jpg
├── WOOLITE BLUE.jpg
├── MAGISTRAL ORIGINAL.jpg
├── MAGISTRAL PLATINUM 500.JPG
├── FINISH.jpg
├── FINISH ADV.jpg
├── CIF LAVANDA AERO.jpg
├── VIM CAN.jpg
├── HARPIC BLACK.jpg
└── Cif Crema x 750.jpg
├── README.md

