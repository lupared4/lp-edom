// Este console.log debería aparecer tan pronto como el script se carga
console.log("script.js: Archivo cargado.");

// === Elementos del DOM ===
const productGrid = document.getElementById('product-list'); // Contenedor donde se encuentran los productos estáticos
const cartItemsContainer = document.getElementById('cart-items'); // Contenedor para los ítems del carrito
const cartTotalElement = document.getElementById('cart-total'); // Elemento para mostrar el total del carrito
const cartItemCountElement = document.getElementById('cart-item-count'); // Elemento para mostrar el contador de ítems en el carrito
const emptyCartMessage = document.getElementById('empty-cart-message'); // Mensaje de carrito vacío
const cartDropdown = document.getElementById('cart-dropdown'); // El contenedor del dropdown del carrito
const cartButton = document.querySelector('.main-header .user-actions .cart .dropbtn'); // El botón para abrir el carrito

// === Variables del Carrito ===
let cart = []; // Array para almacenar los productos en el carrito

// === Funciones del Carrito ===

// Función para cargar el carrito desde localStorage (al inicio)
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        try {
            cart = JSON.parse(storedCart);
        } catch (e) {
            console.error("Error al parsear el carrito de localStorage:", e);
            cart = []; // Si hay un error, inicializar el carrito vacío
        }
    }
    renderCart(); // Renderizar el carrito al cargar la página
}

// Función para guardar el carrito en localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para renderizar los productos del carrito en el DOM
function renderCart() {
    cartItemsContainer.innerHTML = ''; // Limpiar el contenido actual del carrito
    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block'; // Mostrar mensaje de carrito vacío
    } else {
        emptyCartMessage.style.display = 'none'; // Ocultar mensaje si hay ítems
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <p>${item.name}</p>
                    <div class="quantity-controls">
                        <button class="decrease-quantity" data-product-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-product-id="${item.id}">+</button>
                    </div>
                </div>
                <p class="item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item" data-product-id="${item.id}">X</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            total += item.price * item.quantity;
            itemCount += item.quantity;
        });
    }

    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartItemCountElement.textContent = itemCount; // Actualizar el contador en la cabecera
}

// Función para añadir un producto al carrito
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCartToLocalStorage();
    renderCart();
    // Opcional: Mostrar una confirmación al usuario
    // alert(`${product.name} añadido al carrito.`);
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage();
    renderCart();
}

// Función para cambiar la cantidad de un producto en el carrito
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId); // Si la cantidad es 0 o menos, eliminar
        } else {
            saveCartToLocalStorage();
            renderCart();
        }
    }
}

// === Event Listeners ===

document.addEventListener('DOMContentLoaded', () => {
    // Este console.log debería aparecer cuando el DOM esté completamente cargado
    console.log("DOMContentLoaded: El DOM está completamente cargado y el script se está ejecutando.");

    // Cargar el carrito al iniciar la página
    loadCartFromLocalStorage();

    // === Control de menús desplegables con JavaScript ===
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const dropbtn = dropdown.querySelector('.dropbtn'); // El botón que abre el dropdown

        if (dropdownContent && dropbtn) {
            // Mostrar dropdown al pasar el ratón por encima del área del menú
            dropdown.addEventListener('mouseenter', () => {
                dropdownContent.classList.add('show');
                // Opcional: Cambiar el fondo del botón al pasar el ratón
                if (dropbtn) dropbtn.style.backgroundColor = '#eee';
            });

            // Ocultar dropdown al salir el ratón del área del menú
            dropdown.addEventListener('mouseleave', (event) => {
                // Solo ocultar si el ratón realmente sale del dropdown y su contenido
                if (!dropdown.contains(event.relatedTarget)) {
                    dropdownContent.classList.remove('show');
                    // Opcional: Restaurar el fondo del botón
                    if (dropbtn) dropbtn.style.backgroundColor = ''; // Restablecer al valor por defecto CSS
                }
            });
        }
    });

    // Control global para ocultar todos los dropdowns si se hace clic fuera
    document.addEventListener('click', (event) => {
        document.querySelectorAll('.dropdown-content.show').forEach(dropdown => {
            const parentDropdown = dropdown.closest('.dropdown');
            const dropbtn = parentDropdown ? parentDropdown.querySelector('.dropbtn') : null;

            // Si el clic no fue dentro del botón del dropdown ni dentro del contenido del dropdown abierto
            if (!dropbtn || (!dropbtn.contains(event.target) && !dropdown.contains(event.target))) {
                dropdown.classList.remove('show'); // Ocultar eliminando la clase 'show'
                if (dropbtn) dropbtn.style.backgroundColor = ''; // Restaurar fondo del botón
            }
        });
    });

    // Evitar que el clic *dentro* de un dropdown lo cierre inmediatamente
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    });


    // Delegación de eventos para los botones "Añadir al carrito"
    productGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productItem = event.target.closest('.product-item');
            const productId = productItem.dataset.productId; // El ID del producto estático
            
            const productName = productItem.querySelector('h3').textContent;
            const productPriceText = productItem.querySelector('.price').textContent;
            // Eliminar el signo '$' y los puntos de miles para parsear correctamente el número
            // El `replace(/\./g, '')` se encarga de eliminar todos los puntos (miles)
            // Esto asume que el formato de moneda es $X.XXX (donde . es separador de miles)
            const productPrice = parseFloat(productPriceText.replace('$', '').replace(/\./g, '')); 
            const productImage = productItem.querySelector('img').src;

            const product = {
                id: productId,
                name: productName, 
                price: productPrice,
                image: productImage
            };
            addToCart(product);
        }
    });

    // Delegación de eventos para eliminar o cambiar cantidad de productos del carrito
    cartItemsContainer.addEventListener('click', (event) => {
        const productId = event.target.dataset.productId; // Se obtiene el string ID

        if (event.target.classList.contains('remove-item')) {
            removeFromCart(productId);
        } else if (event.target.classList.contains('increase-quantity')) {
            changeQuantity(productId, 1);
        } else if (event.target.classList.contains('decrease-quantity')) {
            changeQuantity(productId, -1);
        }
    });

    // === Validación del Formulario de Contacto ===
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const messageInput = contactForm.querySelector('#message');

            if (nameInput.value.trim() === '') {
                alert('Por favor, ingresa tu nombre.');
                event.preventDefault();
                return;
            }

            if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
                alert('Por favor, introduce un correo electrónico válido.');
                event.preventDefault();
                return;
            }

            if (messageInput.value.trim() === '') {
                alert('Por favor, ingresa tu mensaje.');
                event.preventDefault();
                return;
            }

            // Aquí puedes añadir un mensaje de éxito o redirigir
            alert('Mensaje enviado con éxito. Gracias por contactarnos!');
            // Permite que Formspree maneje el envío real
        });
    }

    // === Funcionalidad del login/registro (Placeholder) ===
    const loginRegisterForm = document.getElementById('login-register-form');
    const registerButton = document.getElementById('register-button');

    if (loginRegisterForm) {
        loginRegisterForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evitar envío real por ahora
            alert('Funcionalidad de Iniciar Sesión no implementada, es solo un placeholder.');
            // Aquí iría la lógica de autenticación real
        });
    }

    if (registerButton) {
        registerButton.addEventListener('click', () => {
            alert('Funcionalidad de Registro no implementada, es solo un placeholder.');
            // Aquí iría la lógica de registro real
        });
    }

});

