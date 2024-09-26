const express = require('express')
const rutas = express.Router()
const tareaControlador = require('../controllers/tareaControlador')
const authMiddleware = require('../middleware/authMiddleware')

rutas.get('/', authMiddleware.authMiddleware , tareaControlador.obtenerTareas)
rutas.post('/', authMiddleware.authMiddleware , tareaControlador.crearTareas)
rutas.put('/:id', authMiddleware.authMiddleware , tareaControlador.editarTarea)
rutas.delete('/:id', authMiddleware.authMiddleware , tareaControlador.eliminarTarea)

module.exports = rutas