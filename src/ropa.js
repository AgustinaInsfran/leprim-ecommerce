import './style.css'
import ropa from './data/ropa.json'
import { formatPrice, agregarAlCarrito } from './main.js' 

const startRopa = () => {

    const grid = document.getElementById('grid-ropa')


    ropa.forEach(ropa =>{
    
        const item = document.createElement('div')
        item.className = 'w-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-105 duration-300 tarjeta-ropa m-2 text-center'
        item.dataset.categoria = ropa.categoria

        const imagen = document.createElement('img')
        const transformacion = 'c_pad,w_400,h_400,b_white'
        const urlTransformada = ropa.img.replace('/upload/', `/upload/${transformacion}/`)
        imagen.src = urlTransformada
        imagen.alt = ropa.nombre || `Vestimenta ${ropa.id}`
        imagen.className = 'w-full h-64 object-contains'

        const titulo = document.createElement('h2')
        titulo.textContent = `${ropa.nombre}`
        titulo.className = 'font-bold text-xl mt-2'

        const precio = document.createElement('p')
        precio.textContent = `$${formatPrice(ropa.precio)}`
        precio.className = 'p-4 text-xl font-semibold'

        const boton = document.createElement('button')
        boton.textContent = 'Agregar'
        boton.className = 'm-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-800 cursor-pointer'

        boton.addEventListener('click', () => {
            agregarAlCarrito(ropa)
        })

        item.appendChild(imagen)
        item.appendChild(titulo)
        item.appendChild(precio)
        item.appendChild(boton)

        grid.appendChild(item)

    })

    const filtro = document.querySelectorAll('#filtro-cat button')
    const tarjeta = document.querySelectorAll('#grid-ropa .tarjeta-ropa') 

    filtro.forEach(boton => {
        boton.addEventListener('click', filtrarProductos)
    });

    function filtrarProductos(evento) {
        filtro.forEach(boton => {
            boton.classList.remove('text-primary','font-semibold', 'border-b-2', 'border-b-primary')
        })
        //Referencio un botón específico al que hice click
        const botonClickeado = evento.target 
        botonClickeado.classList.add('text-primary', 'font-semibold', 'border-b-2', 'border-b-primary')
        const catFiltro = botonClickeado.dataset.categoria

        tarjeta.forEach(tarjeta => {
            const categoria = tarjeta.dataset.categoria
            if (categoria === catFiltro) {
                tarjeta.classList.remove('hidden')
            }
            else {
                tarjeta.classList.add('hidden')
            }
        })
    }

    const botonMedias = document.querySelector('#filtro-cat button[data-categoria="medias"]');
    if (botonMedias) {
        botonMedias.click(); 
    }
}

document.addEventListener('DOMContentLoaded', startRopa)

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});