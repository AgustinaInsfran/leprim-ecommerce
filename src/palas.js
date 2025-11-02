import './style.css'
import palas from './data/palas.json'
import { formatPrice, agregarAlCarrito } from './main.js' 

const startPalas = () => {

    const grid = document.getElementById('grid-palas')


    palas.forEach(pala =>{
    
        const item = document.createElement('div')
        item.className = 'w-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-105 duration-300 tarjeta-pala m-2 text-center'

        item.dataset.marca = pala.marca

        const imagen = document.createElement('img')
        const transformacion = 'c_pad,w_400,h_400,b_white'
        const urlTransformada = pala.img.replace('/upload/', `/upload/${transformacion}/`)
        imagen.src = urlTransformada
        imagen.alt = pala.nombre || `Palas ${pala.id}`
        imagen.className = 'w-full h-72 object-contains'

        const titulo = document.createElement('h2')
        titulo.textContent = `${pala.nombre}`
        titulo.className = 'font-bold text-2xl mt-2'

        const precio = document.createElement('p')
        precio.textContent = `$${formatPrice(pala.precio)}`
        precio.className = 'p-4 text-xl font-semibold'

        const boton = document.createElement('button')
        boton.textContent = 'Agregar'
        boton.className = 'm-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-800 cursor-pointer'

        boton.addEventListener('click', () => {
            agregarAlCarrito(pala)
        })

        item.appendChild(imagen)
        item.appendChild(titulo)
        item.appendChild(precio)
        item.appendChild(boton)

        grid.appendChild(item)

    })

    const filtro = document.querySelectorAll('#filtro-marcas button')
    const tarjeta = document.querySelectorAll('#grid-palas .tarjeta-pala') 

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
        const marcaFiltro = botonClickeado.dataset.marca

        tarjeta.forEach(tarjeta => {
            const marca = tarjeta.dataset.marca
            if (marca === marcaFiltro) {
                tarjeta.classList.remove('hidden')
            }
            else {
                tarjeta.classList.add('hidden')
            }
        })
    }

    const botonNox = document.querySelector('#filtro-marcas button[data-marca="nox"]');
    if (botonNox) {
        botonNox.click(); 
    }
}

document.addEventListener('DOMContentLoaded', startPalas)

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});