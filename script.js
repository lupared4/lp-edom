// script.js - Archivo principal de JavaScript para la tienda online
console.log("script.js: Archivo cargado."); // cite: 3

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
    const storedCart = localStorage.getItem('cart'); // cite: 3
    if (storedCart) { // cite: 3
        try { // cite: 3
            cart = JSON.parse(storedCart); // cite: 3
        } catch (e) { // cite: 3
            console.error("Error al parsear el carrito de localStorage:", e); // cite: 3
            cart = []; // Si hay un error, inicializar el carrito vacío
        }
    }
    renderCart(); // Renderizar el carrito al cargar
}

// Función para guardar el carrito en localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart)); // cite: 3
}

// Función para añadir un producto al carrito
function addToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.id === product.id); // cite: 3

    if (existingProductIndex !== -1) { // cite: 3
        // Si el producto ya existe en el carrito, incrementar la cantidad
        cart[existingProductIndex].quantity++; // cite: 3
    } else {
        // Si el producto no existe, añadirlo con cantidad 1
        cart.push({ ...product, quantity: 1 }); // cite: 3
    }
    saveCartToLocalStorage(); // cite: 3
    renderCart(); // cite: 3
    alert(`${product.name} ha sido añadido al carrito.`); // Mensaje de confirmación
}

// Función para cambiar la cantidad de un producto en el carrito
function changeQuantity(productId, change) {
    const productIndex = cart.findIndex(item => item.id === productId); // cite: 3

    if (productIndex !== -1) { // cite: 3
        cart[productIndex].quantity += change; // cite: 3
        if (cart[productIndex].quantity <= 0) { // cite: 3
            // Si la cantidad es 0 o menos, eliminar el producto del carrito
            cart.splice(productIndex, 1); // cite: 3
        }
        saveCartToLocalStorage(); // cite: 3
        renderCart(); // cite: 3
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId); // cite: 3
    saveCartToLocalStorage(); // cite: 3
    renderCart(); // cite: 3
}

// Función para renderizar el contenido del carrito en el dropdown
function renderCart() {
    cartItemsContainer.innerHTML = ''; // Limpiar el contenido actual del carrito
    let total = 0; // cite: 3
    let itemCount = 0; // cite: 3

    if (cart.length === 0) { // cite: 3
        emptyCartMessage.style.display = 'block'; // cite: 3
    } else {
        emptyCartMessage.style.display = 'none'; // cite: 3
        cart.forEach(item => { // cite: 3
            const itemTotal = item.price * item.quantity; // cite: 3
            total += itemTotal; // cite: 3
            itemCount += item.quantity; // cite: 3

            const cartItemElement = document.createElement('div'); // cite: 3
            cartItemElement.classList.add('cart-item'); // cite: 3
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <span class="item-name">${item.name}</span>
                    <div class="quantity-controls">
                        <button class="decrease-quantity" data-product-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-product-id="${item.id}">+</button>
                    </div>
                </div>
                <span class="item-price">$${itemTotal.toFixed(2)}</span>
                <button class="remove-item" data-product-id="${item.id}">&times;</button>
            `; // cite: 3
            cartItemsContainer.appendChild(cartItemElement); // cite: 3
        });
    }

    cartTotalElement.textContent = total.toFixed(2); // cite: 3
    cartItemCountElement.textContent = itemCount; // cite: 3
}

// === Nuevas Funciones para Cargar Productos desde JSON (simulando API REST) ===

// Función para renderizar los productos en la página principal
function renderProducts(products) {
    productGrid.innerHTML = ''; // Limpiar el contenedor actual
    products.forEach(product => { // cite: 3
        const productItemElement = document.createElement('div'); // cite: 3
        productItemElement.classList.add('product-item'); // cite: 3
        productItemElement.dataset.productId = product.id; // Importante para añadir al carrito

        productItemElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Añadir al carrito</button>
        `; // cite: 3
        productGrid.appendChild(productItemElement); // cite: 3
    });
}

// Función para obtener productos de la "API" (tu archivo JSON local)
async function fetchProducts() {
    try {
        // Asegúrate de que la ruta sea correcta si tu archivo JSON está en otro lugar
        const response = await fetch('products.json'); // cite: 3
        if (!response.ok) { // cite: 3
            throw new Error(`HTTP error! status: ${response.status}`); // cite: 3
        }
        const products = await response.json(); // cite: 3
        renderProducts(products); // Renderizar los productos obtenidos
    } catch (error) { // cite: 3
        console.error("Error al cargar los productos:", error); // cite: 3
        // Mostrar un mensaje al usuario si no se pueden cargar los productos
        productGrid.innerHTML = '<p style="text-align: center; color: red; padding: 20px;">No se pudieron cargar los productos en este momento. Por favor, inténtalo más tarde.</p>'; // cite: 3
    }
}


// === Event Listeners ===
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded: El DOM está completamente cargado y el script se está ejecutando."); // cite: 3

    // Cargar el carrito al iniciar la página
    loadCartFromLocalStorage(); // cite: 3

    // Cargar los productos al iniciar la página desde el JSON
    fetchProducts(); // cite: 3

    // Event listener para añadir productos al carrito (delegación de eventos)
    productGrid.addEventListener('click', (event) => { // cite: 3
        if (event.target.classList.contains('add-to-cart')) { // cite: 3
            const productItem = event.target.closest('.product-item'); // cite: 3
            const productId = productItem.dataset.productId; // cite: 3
            const productName = productItem.querySelector('h3').textContent; // cite: 3
            const productPriceText = productItem.querySelector('.price').textContent; // cite: 3
            const productPrice = parseFloat(productPriceText.replace('$', '')); // cite: 3
            const productImage = productItem.querySelector('img').src; // cite: 3

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            }; // cite: 3
            addToCart(product); // cite: 3
        }
    });

    // Event listener para el carrito (cambiar cantidad o eliminar) - delegación de eventos
    cartItemsContainer.addEventListener('click', (event) => { // cite: 3
        const productId = event.target.dataset.productId; // cite: 3
        if (event.target.classList.contains('increase-quantity')) { // cite: 3
            changeQuantity(productId, 1); // cite: 3
        } else if (event.target.classList.contains('decrease-quantity')) { // cite: 3
            changeQuantity(productId, -1); // cite: 3
        } else if (event.target.classList.contains('remove-item')) { // cite: 3
            removeFromCart(productId); // cite: 3
        }
    });

    // Toggle del dropdown del carrito
    cartButton.addEventListener('click', (event) => { // cite: 3
        event.preventDefault(); // Evitar el comportamiento por defecto del enlace
        cartDropdown.classList.toggle('show'); // cite: 3
    });

    // Cerrar el dropdown del carrito si se hace clic fuera
    window.addEventListener('click', (event) => { // cite: 3
        if (!event.target.matches('.cart-button') && !event.target.closest('.cart-dropdown')) { // cite: 3
            if (cartDropdown.classList.contains('show')) { // cite: 3
                cartDropdown.classList.remove('show'); // cite: 3
            }
        }
    });

    // === Funcionalidad del Modal de Login/Registro ===
    const loginModal = document.getElementById('login-modal'); // cite: 3
    const loginLink = document.getElementById('login-link'); // cite: 3
    const closeButton = document.querySelector('.modal .close-button'); // cite: 3

    if (loginLink && loginModal && closeButton) { // cite: 3
        loginLink.addEventListener('click', (event) => { // cite: 3
            event.preventDefault(); // cite: 3
            loginModal.style.display = 'block'; // cite: 3
            // Asegurarse de que al abrir el modal, la pestaña de login esté activa por defecto
            document.querySelector('.tab-button[data-tab="login"]').click();
        });

        closeButton.addEventListener('click', () => { // cite: 3
            loginModal.style.display = 'none'; // cite: 3
        });

        window.addEventListener('click', (event) => { // cite: 3
            if (event.target === loginModal) { // cite: 3
                loginModal.style.display = 'none'; // cite: 3
            }
        });
    }

    // === Manejo de Pestañas Login/Register en el Modal (NUEVO) ===
    const loginTabButton = document.querySelector('.tab-button[data-tab="login"]');
    const registerTabButton = document.querySelector('.tab-button[data-tab="register"]');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginTabButton && registerTabButton && loginForm && registerForm) {
        loginTabButton.addEventListener('click', () => {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            loginTabButton.classList.add('active');
            registerTabButton.classList.remove('active');
        });

        registerTabButton.addEventListener('click', () => {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            registerTabButton.classList.add('active');
            loginTabButton.classList.remove('active');
        });
    }


    // === Validación del Formulario de Contacto ===
    const contactForm = document.querySelector('.contact-form'); // cite: 3
    if (contactForm) { // cite: 3
        contactForm.addEventListener('submit', (event) => { // cite: 3
            const nameInput = document.getElementById('name'); // cite: 3
            const emailInput = document.getElementById('email'); // cite: 3
            const messageInput = document.getElementById('message'); // cite: 3

            if (nameInput.value.trim() === '') { // cite: 3
                alert('Por favor, ingresa tu nombre.'); // cite: 3
                event.preventDefault(); // cite: 3
                return; // cite: 3
            }

            if (emailInput.value.trim() === '') { // cite: 3
                alert('Por favor, ingresa tu correo electrónico.'); // cite: 3
                event.preventDefault(); // cite: 3
                return; // cite: 3
            }

            if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) { // cite: 3
                alert('Por favor, introduce un correo electrónico válido.'); // cite: 3
                event.preventDefault(); // cite: 3
                return; // cite: 3
            }

            if (messageInput.value.trim() === '') { // cite: 3
                alert('Por favor, ingresa tu mensaje.'); // cite: 3
                event.preventDefault(); // cite: 3
                return; // cite: 3
            }

            // Aquí puedes añadir un mensaje de éxito o redirigir
            alert('Mensaje enviado con éxito. Gracias por contactarnos!'); // cite: 3
            // Permite que Formspree maneje el envío real
        });
    }

    // === Funcionalidad del login/registro (Modificado para separar login y registro) ===
    // const loginRegisterForm = document.getElementById('login-register-form'); // Este ya no es necesario como tal
    const loginSubmitButton = document.querySelector('#login-form .btn'); // Botón de "Iniciar Sesión" del formulario de login
    const registerSubmitButton = document.getElementById('register-button-submit'); // Botón de "Registrarse" del formulario de registro

    if (loginSubmitButton) {
        loginSubmitButton.addEventListener('click', (event) => {
            event.preventDefault(); // Evitar envío real por ahora
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
            const user = registeredUsers.find(u => u.username === username && u.password === password);

            if (user) {
                alert(`¡Bienvenido, ${username}! Has iniciado sesión.`);
                loginModal.style.display = 'none'; // Cerrar el modal
                // Aquí podrías redirigir al usuario o actualizar la UI para mostrar que está logueado
            } else {
                alert('Usuario o contraseña incorrectos.');
            }
        });
    }

    if (registerSubmitButton) {
        registerSubmitButton.addEventListener('click', (event) => {
            event.preventDefault(); // Evitar envío real por ahora

            // Obtener los valores de los campos de registro
            const username = document.getElementById('register-username').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            // Validaciones básicas
            if (!username || !email || !password || !confirmPassword) {
                alert('Por favor, completa todos los campos para el registro.');
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                alert('Por favor, introduce un correo electrónico válido para el registro.');
                return;
            }

            if (password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            // Simulación de registro (guardar en localStorage)
            let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

            // Verificar si el usuario o email ya existen
            const userExists = registeredUsers.some(user => user.username === username || user.email === email);
            if (userExists) {
                alert('El nombre de usuario o correo electrónico ya están registrados.');
                return;
            }

            // Añadir el nuevo usuario
            const newUser = { username, email, password }; // NO SEGURO: En un sistema real, no guardarías la contraseña en texto plano
            registeredUsers.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            loginModal.style.display = 'none'; // Cerrar el modal después del registro
            // Opcionalmente, puedes pre-llenar los campos de login con el nuevo usuario
            document.getElementById('username').value = username;
            document.getElementById('password').value = password;
            // Y cambiar a la pestaña de login
            document.querySelector('.tab-button[data-tab="login"]').click();
        });
    }
});
