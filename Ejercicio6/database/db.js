const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root', //admin
    password:'', //admin
    database:'mincultura_db'
})

conexion.connect((error)=>{
    if(error){
        console.log("Error de conexión:" + error)
        return 
    }
    console.log("Conexión a mysql exítosa")
})

module.exports = conexion