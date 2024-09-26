const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config()
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

conexion.connect((error)=> {
    if(error){
        console.error('Error al conectarse a MySQL', error)
        return;
    }
    console.log('conectado a MySQL')
})

module.exports = conexion

