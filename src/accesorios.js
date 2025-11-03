import './style.css'
import accesorios from './data/accesorios.json'
import { formatPrice, agregarAlCarrito } from './main.js' 

const startAccesorios = () => {

    const grid = document.getElementById('grid-accesorios')


    accesorios.forEach(accesorio =>{
    
        const item = document.createElement('div')
        item.className = 'w-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-105 duration-300 m-2 text-center'
    
        const imagen = document.createElement('img')
        const transformacion = 'c_pad,w_400,h_400,b_white'
        const urlTransformada = accesorio.img.replace('/upload/', `/upload/${transformacion}/`)
        imagen.src = urlTransformada
        imagen.alt = accesorio.nombre || `Accesorio ${accesorio.id}`
        imagen.className = 'w-full h-64 object-contains'

        const titulo = document.createElement('h2')
        titulo.textContent = `${accesorio.nombre}`
        titulo.className = 'font-bold text-xl mt-2'

        const precio = document.createElement('p')
        precio.textContent = `$${formatPrice(accesorio.precio)}`
        precio.className = 'p-4 text-xl font-semibold'

        const boton = document.createElement('button')
        boton.textContent = 'Agregar'
        boton.className = 'm-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-800 cursor-pointer'

        boton.addEventListener('click', () => {
            agregarAlCarrito(accesorio)
        })

        item.appendChild(imagen)
        item.appendChild(titulo)
        item.appendChild(precio)
        item.appendChild(boton)

        grid.appendChild(item)

    })
}

document.addEventListener('DOMContentLoaded', startAccesorios)

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});