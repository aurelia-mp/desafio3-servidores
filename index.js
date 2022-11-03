const express = require('express')
const Contenedor = require("./class.js")
const productos = new Contenedor('./productos.txt')

const app = express()

const PORT = 8080

const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

const bienvenida = '<h1 style="color: red">Bienvenidos a la tienda</h1>'

app.get('/', (req, res) =>{
    res.send(bienvenida)
})

app.get('/productos', (req, res)=>{
    productos.getAll()
        .then((r=>{
            res.send(r)
        }))
})

app.get('/productoRandom', (req,res)=>{
    let cantidadProductos = 0
    // Se usa primero getAll para saber cuántos productos hay en total
    productos.getAll()
        .then(r=>{
            cantidadProductos = JSON.parse(r).length
            return cantidadProductos
        })
        // Una vez que tengo la cantidad de productos, genero el num aleatorio
        .then(r=>{
            const id = Math.floor(Math.random()* cantidadProductos)
            productos.getById(id)
            .then(r=>res.send(r))
        })
})
