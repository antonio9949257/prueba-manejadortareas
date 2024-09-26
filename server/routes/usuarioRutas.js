const express = require('express')
const rutas = express.Router()
const usuarioControlador = require('../controllers/usuarioControlador')

rutas.post('/register', usuarioControlador.registrarUsuario)
rutas.post('/login', usuarioControlador.iniciarSesion)
rutas.post('/logout', usuarioControlador.cerrarSesion)

module.exports= rutas