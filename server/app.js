const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())
app.use(express.static('public'))
const tareaRutas = require('./routes/tareaRutas')
const usuarioRutas = require('./routes/usuarioRutas')

app.use('/api/tareas', tareaRutas)
app.use('/api/usuarios', usuarioRutas)

app.listen(process.env.PORT, ()=> {
    console.log(`Server corriendo en el puerto ${process.env.PORT}`)
})