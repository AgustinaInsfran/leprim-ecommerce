import './style.css'

const productos = [ 
    { id: 1, precio: 490000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760465509/P1_ofhud4.webp'},
    { id: 2, precio: 420000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760465540/P2_ob6gsv.webp'},
    { id: 3, precio: 690000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760826760/P3_kys6bi.jpg'},
    { id: 4, precio: 790000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760826761/P4_rsioxi.webp'},
    { id: 5, precio: 890000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827741/P5_ugwib5.webp'},
    { id: 6, precio: 990000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827741/P6_kj1f2q.webp'},
    { id: 7, precio: 1090000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827742/P7_rgxqpd.webp'},
    { id: 8, precio: 1190000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760830191/P8_ocijee.webp'},
    { id: 9, precio: 1290000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827742/P9_fklukm.webp'},
    { id: 10, precio: 1390000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827742/P10_az8r90.webp'},
    { id: 11, precio: 1490000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827742/P11_z9h7ba.webp'},
    { id: 12, precio: 1590000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827742/P12_jk9etc.webp'},
    { id: 13, precio: 1690000, img: 'https://res.cloudinary.com/dgrd1vhpw/image/upload/v1760827742/P13_qpapxa.webp'},
]

const start = () => {

    const contenedor = document.querySelector('.contenedor')

    // Crear estructura del carrusel usando utilidades de Tailwind
    const carousel = document.createElement('div')
    carousel.className = 'relative w-full flex items-center'

    const track = document.createElement('div')
   
    track.className = 'flex gap-4 overflow-x-auto scroll-smooth p-3'
    track.style.scrollBehavior = 'smooth'
    track.style.webkitOverflowScrolling = 'touch'
    track.style.scrollSnapType = 'x mandatory'

    productos.forEach(producto => {
        const item = document.createElement('div')
        item.className = 'flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-105 duration-300'
        item.style.scrollSnapAlign = 'center'

        const imagen = document.createElement('img')
        imagen.src = producto.img
        imagen.alt = producto.nombre || `Producto ${producto.id}`
        imagen.className = 'w-full h-72 object-cover'

        const precio = document.createElement('p')
        precio.textContent = `$${producto.precio}`
        precio.className = 'p-4 text-2xl font-semibold'

        const boton = document.createElement('button')
        boton.textContent = 'Agregar'
        boton.className = 'm-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700'

        item.appendChild(imagen)
        item.appendChild(precio)
        item.appendChild(boton)

        track.appendChild(item)
    })

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
        isDown = true
        startX = e.clientX
        scrollLeft = track.scrollLeft
        track.setPointerCapture && track.setPointerCapture(e.pointerId)
    })

    track.addEventListener('pointermove', (e) => {
        if (!isDown) return
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
}

document.addEventListener('DOMContentLoaded', start)

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});