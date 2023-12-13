const express = require('express')
const conexion = require('../database/db')

exports.consultar = (req, res) =>{
    conexion.query('select*from producto',(error, consulta) =>{
        if(error){
            console.log('Error consultando tabla Producto '+error)
            return
        }
        else{
            console.log(consulta)
            res.render('products',{
                consulta1:consulta
            })
        }
    })
}
exports.save = (req, res) => {
    const id = req.body.id
    const nombre = req.body.nombre
    const precio = req.body.precio
    console.log(req.body)
    var comando = "INSERT INTO producto (Id, Nombre, Precio) VALUES ("
    comando += id + ",'"+nombre+"',"+precio+")"
    console.log(comando)
    conexion.query(comando, (error, resultado) =>{
        if(error){
            console.log(error)
        } else{
            res.redirect("/productos")
        }
    })
}
exports.consultarUno = (req, res) => {
    const id = req.params.id
    console.log(id)
    
    conexion.query('select*from producto WHERE id ='+id,(error, consulta) =>{
        if(error){
            console.log('Error consultando el id en la tabla persona')
            return
        }
        else{
            res.render('edit',{
                producto:consulta[0]
            })
        }
    })
}
exports.actualizar = (req, res) => {
    const id = req.body.id
    const nombre = req.body.nombre
    const precio = req.body.precio

    var comando = "UPDATE producto SET "                                  
    comando += "Nombre = '" + nombre
    comando += "', Precio =" + precio
    comando +=  " WHERE id = " + id                                  
    console.log(comando)
    conexion.query(comando, (error, resultado) =>{
        if(error){
            console.log(error)
        } else{
            res.redirect("/productos")
        }
    })
}
exports.delete = (req, res) => {
    const id = req.params.id

    var comando = "DELETE from producto WHERE id = " + id                                  
    console.log(comando)
    conexion.query(comando, (error, resultado) =>{
        if(error){
            console.log(error)
        } else{
            res.redirect("/productos")
        }
    })
}

//Funciones para facturas
exports.consultarFacturas = (req, res) =>{
    conexion.query('select*from factura',(error, consulta) =>{
        if(error){
            console.log('Error consultando tabla Factura '+error)
            return
        }
        else{
            console.log(consulta)
            res.render('invoices',{
                consulta1:consulta
            })
        }
    })
}
exports.saveInvoice = (req, res) => {
    const id = req.body.id
    const numero = req.body.numero
    const fecha = req.body.fecha
    //const fechaFormateada = fecha.toISOString().slice(0, 10);

    const productId = req.body.id_product
    const cantidad = req.body.cantidad

    var query1 = "INSERT INTO factura (Id, Numero, Fecha) VALUES ("
    query1 += id + "," + numero + ", DATE_FORMAT('" + fecha + "', '%Y-%m-%d'))"
    conexion.query(query1, (error, resultado) =>{
        if(error){
            console.log(error)
            res.status(500).send('Error al guardar la factura')
        } else{
            var query2 = 'SELECT Precio FROM producto WHERE Id =' + productId
            conexion.query(query2, (error, resultadoProducto) =>{
                if(error){
                    console.log(error)
                    res.status(500).send('Error al obtener precio')
                } else{
                    const precioUnitario = resultadoProducto[0].Precio
                    const precioTotal = precioUnitario * cantidad
                    console.log("PRECIO TOTAL",precioTotal)

                    var query3 = "INSERT INTO detallefactura (Id, IdFactura, IdProducto, Cantidad) VALUES ("
                    query3 += id + "," + id + "," + productId + "," + cantidad +")"
                    conexion.query(query3, (error, resultadoDetalle) =>{
                        if(error){
                            console.log(error)
                            res.status(500).send('Error al guardar el detalle de factura')
                        } else{
                            var query3 = "UPDATE factura SET "                                  
                            query3 += "TotalProductos = " + cantidad
                            query3 += ", PrecioTotal =" + precioTotal
                            query3 +=  " WHERE id = " + id  

                            conexion.query(query3, (error, resultadoFactura) =>{
                                if(error){
                                    console.log(error)
                                    res.status(500).send('Error al actualizar la factura')
                                } else {
                                    res.redirect("/facturas")
                                } 
                            })     
                        }
                    })                 
                }
            })
        }
    })
}
