import './style.css'
const productos = [ 
    { id: 1, nombre: 'Nox Quantum', precio: 490000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760465509/P1_ofhud4.webp'},
    { id: 2, nombre: 'Bullpadel Hack 04', precio: 420000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760465540/P2_ob6gsv.webp'},
    { id: 3, nombre: 'Nox AT10 Genius 18K', precio: 690000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760826760/P3_kys6bi.jpg'},
    { id: 4, nombre: 'Bullpadel Vertex', precio: 790000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760826761/P4_rsioxi.webp'},
    { id: 5, nombre: 'Nox AT2 Genius LTD', precio: 890000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827741/P5_ugwib5.webp'},
    { id: 6, nombre: 'Siux Fenix Elite S', precio: 350000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827741/P6_kj1f2q.webp'},
    { id: 7, nombre: 'Babolat Technical Viper', precio: 490000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827742/P7_rgxqpd.webp'},
    { id: 8, nombre: 'Babolat Air Veron', precio: 250000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760830191/P8_ocijee.webp'},
    { id: 9, nombre: 'Siux Diablo Revolution', precio: 540000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827742/P9_fklukm.webp'},
    { id: 10, nombre: 'Babolat Counter Veron', precio: 245000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827742/P10_az8r90.webp'},
    { id: 11, nombre: 'Adidas Metalbone', precio: 400000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827742/P11_z9h7ba.webp'},
    { id: 12, nombre: 'Bullpadel Vertex 04', precio: 400000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827742/P12_jk9etc.webp'},
    { id: 13, nombre: 'Adidas Metalbone Light', precio: 420000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827742/P13_qpapxa.webp'},
]

// Lógica del carrito 

    // * Inicializar el carrito desde LocalStorage o como array vacío
    let carrito = JSON.parse(localStorage.getItem('leprimCarrito')) || [];

    let cartModal, closeCartBtn, cartIcon, cartItemsContainer, cartTotalEl, cartCounterEl, cartEmptyMsg;

    function guardarCarrito() {
        localStorage.setItem('leprimCarrito', JSON.stringify(carrito));
    }

    /**
    * Formatea un número como moneda (ej: 490000 -> "490.000")
    * @param {number} price - El precio a formatear
    */
    export function formatPrice(price) {
        // 'es-AR' usa el punto como separador de miles
        return price.toLocaleString('es-AR');
    }

const start = () => {

    const hamburgerBtn = document.getElementById('hamburguesa-btn')
    const mobileMenu = document.getElementById('mobile-menu')
    const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link-mobile')

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden')
        })

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden')
            })
        })
    }

    const contenedor = document.querySelector('.contenedor')

    if (contenedor) {
      // Crear estructura del carrusel usando utilidades de Tailwind
      const carousel = document.createElement('div')
      carousel.className = 'relative w-full flex items-center'

      const track = document.createElement('div')
    
      track.className = 'flex gap-4 overflow-x-auto scroll-smooth p-3'
      track.style.scrollBehavior = 'smooth'
      track.style.webkitOverflowScrolling = 'touch'
      track.style.scrollSnapType = 'x mandatory'

      // Controles (botones) 
      const prev = document.createElement('button')
      prev.className = 'absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-2xl'
      prev.setAttribute('aria-label', 'Anterior')
      prev.textContent = '‹'

      const next = document.createElement('button')
      next.className = 'absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-2xl'
      next.setAttribute('aria-label', 'Siguiente')
      next.textContent = '›'

      carousel.appendChild(prev)
      carousel.appendChild(track)
      carousel.appendChild(next)

      contenedor.appendChild(carousel)

      // Lógica básica de navegación: scroll por anchura de item
      const items = track.querySelectorAll('div')
      const itemWidth = () => items[0] ? items[0].getBoundingClientRect().width : 0

      prev.addEventListener('click', () => {
          track.scrollBy({ left: -itemWidth() - 16, behavior: 'smooth' })
      })

      next.addEventListener('click', () => {
          track.scrollBy({ left: itemWidth() + 16, behavior: 'smooth' })
      })

      // Habilitar arrastre con el pointer (mouse/touch)
      let isDown = false
      let startX
      let scrollLeft

      track.addEventListener('pointerdown', (e) => {
          if (e.target.tagName.toLowerCase() === 'button') {
              return
          }
          isDown = true
          startX = e.clientX
          scrollLeft = track.scrollLeft
          track.setPointerCapture && track.setPointerCapture(e.pointerId)
      })

      track.addEventListener('pointermove', (e) => {
          if (!isDown) return
          e.preventDefault()
          const x = e.clientX
          const walk = (startX - x)
          track.scrollLeft = scrollLeft + walk
      })

      track.addEventListener('pointerup', (e) => {
          isDown = false
          track.releasePointerCapture && track.releasePointerCapture(e.pointerId)
      })

      track.addEventListener('pointerleave', () => {
          isDown = false
      })

      productos.forEach(producto => {

        const item = document.createElement('div')
        item.className = 'flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-105 duration-300'
        item.style.scrollSnapAlign = 'center'

        const imagen = document.createElement('img')
        imagen.src = producto.img
        imagen.alt = producto.nombre || `Producto ${producto.id}`
        imagen.className = 'w-full h-72 object-cover'

        const titulo = document.createElement('h2')
        titulo.textContent = `${producto.nombre}`
        titulo.className = 'font-bold text-2xl mt-2'

        const precio = document.createElement('p')
        precio.textContent = `$${formatPrice(producto.precio)}`
        precio.className = 'p-4 text-xl font-semibold'

        const boton = document.createElement('button')
        boton.textContent = 'Agregar'
        boton.className = 'm-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-800, cursor-pointer'

        boton.addEventListener('click', () => {
            agregarAlCarrito(producto)
        })

        item.appendChild(imagen)
        item.appendChild(titulo)
        item.appendChild(precio)
        item.appendChild(boton)

        track.appendChild(item)
      })

    }

    // Carrito

    // 1. Seleccionar elementos del DOM 
    cartModal = document.getElementById('cart-modal');        
    closeCartBtn = document.getElementById('close-cart-btn');
    cartItemsContainer = document.getElementById('cart-items-container');
    cartTotalEl = document.getElementById('cart-total');        
    cartIcon = document.getElementById('cart-icon-link')
    cartCounterEl = cartIcon.querySelector('span')

    // 2. Asignar listeners para abrir/cerrar modal 
    cartIcon.addEventListener('click', (e) => {
    e.preventDefault() // Prevenir que el enlace # navegue
        cartModal.classList.remove('hidden')
        renderizarCarrito() // Mostrar items actualizados al abrir
    })

    closeCartBtn.addEventListener('click', () => {
        cartModal.classList.add('hidden')
    })

    // Cerrar si se hace clic fuera (en el fondo oscuro)
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) {
        cartModal.classList.add('hidden');
      }
    });

    // 3. Modificar el bucle 'forEach' de productos


    actualizarContadorCarrito()
}

// --- NUEVAS FUNCIONES DEL CARRITO ---

/**
 * Agrega un producto al carrito
 * @param {object} producto - El objeto del producto a agregar
 */
export function agregarAlCarrito(producto) {
  // Comprobar si el producto ya está en el carrito
  const itemEnCarrito = carrito.find(item => item.id === producto.id);

  if (itemEnCarrito) {
    // Si ya está, incrementar cantidad
    itemEnCarrito.cantidad++;
  } else {
    // Si no está, agregarlo con cantidad 1
    // Usamos '...' (spread operator) para crear una copia y añadir la propiedad 'cantidad'
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito(); // Guardar en LocalStorage
  actualizarContadorCarrito(); // Actualizar el badge (número)

  renderizarCarrito(); // Dibuja los productos dentro del carrito
  //cartModal.classList.remove('hidden'); // Muestra el sidebar
}

/**
 * Actualiza el número en el badge del ícono del carrito
 */
function actualizarContadorCarrito() {
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  cartCounterEl.textContent = totalItems;
}

/**
 * Renderiza los items del carrito en el modal
 */
function renderizarCarrito() {
  // Limpiar contenedor
  cartItemsContainer.innerHTML = ''; 

  if (carrito.length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-gray-500">Tu carrito está vacío.</p>';
  }

  let totalCalculado = 0;

  carrito.forEach(item => {
    totalCalculado += item.precio * item.cantidad;

    // Crear HTML para cada item
    const nombreProducto = item.nombre || `Producto ${item.id}`; // Usar nombre o ID
    
    const itemHTML = `
      <div class="flex gap-4 mb-4" data-id="${item.id}">
        <img src="${item.img}" alt="${nombreProducto}" class="w-20 h-20 object-cover rounded">
        <div class="flex-grow">
          <h3 class="font-semibold">${nombreProducto}</h3>
          <p class="text-gray-600">$${formatPrice(item.precio)}</p>
          <div class="flex items-center gap-2 mt-2">
            <span>Cantidad:</span>
            <button class="btn-restar w-6 h-6 bg-gray-200 rounded hover:bg-gray-300">-</button>
            <span class="font-semibold">${item.cantidad}</span>
            <button class="btn-sumar w-6 h-6 bg-gray-200 rounded hover:bg-gray-300">+</button>
          </div>
        </div>
        <button class="btn-eliminar text-red-500 hover:text-red-700 text-sm font-medium">Eliminar</button>
      </div>
    `;
    cartItemsContainer.innerHTML += itemHTML;
  });

  // Actualizar total
  cartTotalEl.textContent = `$${formatPrice(totalCalculado)}`;

  // Añadir listeners a los botones de items (restar, sumar, eliminar)
  agregarListenersItemsCarrito();
}

/**
 * Agrega event listeners a los botones dentro del carrito (sumar, restar, eliminar)
 */
function agregarListenersItemsCarrito() {
  cartItemsContainer.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', manejarEliminarItem);
  });
  cartItemsContainer.querySelectorAll('.btn-restar').forEach(btn => {
    btn.addEventListener('click', manejarRestarItem);
  });
  cartItemsContainer.querySelectorAll('.btn-sumar').forEach(btn => {
    btn.addEventListener('click', manejarSumarItem);
  });
}

function manejarEliminarItem(e) {
  const id = e.target.closest('[data-id]').dataset.id;
  carrito = carrito.filter(item => item.id != id); // '!=' para comparar string con número
  guardarCarrito();
  renderizarCarrito();
  actualizarContadorCarrito();
}

function manejarRestarItem(e) {
  const id = e.target.closest('[data-id]').dataset.id;
  const itemEnCarrito = carrito.find(item => item.id == id);
  if (itemEnCarrito && itemEnCarrito.cantidad > 1) {
    itemEnCarrito.cantidad--;
  } else {
    // Si la cantidad es 1, eliminarlo
    carrito = carrito.filter(item => item.id != id);
  }
  guardarCarrito();
  renderizarCarrito();
  actualizarContadorCarrito();
}

function manejarSumarItem(e) {
  const id = e.target.closest('[data-id]').dataset.id;
  const itemEnCarrito = carrito.find(item => item.id == id);
  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  }
  guardarCarrito();
  renderizarCarrito();
  actualizarContadorCarrito();
}

document.addEventListener('DOMContentLoaded', start)

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});