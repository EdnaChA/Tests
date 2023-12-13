//npm install express ejs mysql dotenv
//npm install -g nodemon
//npm i -D jest supertest

const express = require('express')
const server = express()
const PORT = 8080

server.set("view engine", 'ejs')

const conexion = require('./database/db')
const crud = require('./controler/crud')

server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.use(express.static('./database')) //Modelo
server.use(express.static('./views')) //Vista 
server.use(express.static('./controler')) //Controlador

//Rutas
server.get('/', (req, res) =>{
    res.render("index")
})

server.get('/productos', crud.consultar)

server.get('/crear', (req, res) =>{
    res.render("create")
})
server.post('/salvar', crud.save)

server.get('/editar/:id', crud.consultarUno)
server.post('/actualizar', crud.actualizar)
server.get('/borrar/:id', crud.delete)


server.get('/facturas', crud.consultarFacturas)

server.get('/crearFactura', (req, res) =>{
    res.render("createInvoice")
})

server.post('/salvarFactura', crud.saveInvoice)

let serverListen = server.listen(PORT, () =>{
    console.log("Servidor funcionando en http://localhost:"+PORT)
})

module.exports = {server, serverListen}