//http://expressjs.com/en/starter/hello-world.html
// const mysql = require('mysql')

// const express = require('express');
// const app =  express();

// const cors = require('cors')
// const dotenv = require('dotenv')

// dotenv.config();

// const conexion = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// })

// conexion.connect();

// app.use(express.json());
// app.use(cors());
// app.use(express.static('publico'));

// app.listen(process.env.PORT, () => {
//     console.log(`Servidor ejecutando en http://localhost:${process.env.PORT}`);
// });

// Rutas
// app.get('/api/tareas/', obtenerTareas);
// app.post('/api/tareas/', crearTareas);
// app.put('/api/tareas/:id', editarTarea);
// app.delete('/api/tareas/:id', eliminarTarea)

// Controlador
// async function obtenerTareas(req, res) {
//     try {
//         const tareas = await obtenerAllTareas();
//         res.status(200).json(tareas);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Error al obtener las tareas' });
//     }
// }

// async function crearTareas(req, res) {
//     const { nombre } = req.body;
//     if (!nombre) {
//         return res.status(400).json({ message: 'El nombre de la tarea es obligatorio' });
//     }
//     try {
//         const tareaId = await crearTarea(nombre);
//         res.status(201).json({ message: 'Tarea creada', tareaId });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Error al crear la tarea' });
//     }
// }

// async function editarTarea(req, res){
//     const {id} = req.params;
//     const {nombre} = req.body;

//     if (!nombre) {
//         return res.status(400).json({ message: 'El nombre de la tarea es obligatoria' });
//     }
//     try {
//         await actualizarTarea(id, nombre);
//         res.status(200).json({message: 'Tarea actualizada'})
//     }catch(error){
//         console.log(error);
//         res.status(500).json({ message: 'Error al actualizar la tarea '});
//     }
// }

// async function eliminarTarea(req, res){
//     const  { id }= req.params;
//     try{
//         await borrarTarea(id);
//         res.status(200).json({ message: 'Tarea eliminada'})
//     }catch(error){
//         console.log(error);
//         res.status(500).json({ message: 'Error al eliminar la tarea'})
//     }
// }
// Modelo
// function obtenerAllTareas() {
//     return new Promise((resolve, reject) => {
//         conexion.query('SELECT * FROM tareas', (error, resultado) => {  
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(resultado);
//             }
//         });
//     });
// }

// function crearTarea(nombre) {
//     return new Promise((resolve, reject) => {
//         conexion.query('INSERT INTO tareas (nombre) VALUES (?)', [nombre], (error, resultado) => {  
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(resultado);
//             }
//         })
//     })
// }

// function actualizarTarea(id, nombre){
//     return new Promise((resolve, reject)=> {
//         conexion.query('UPDATE tareas SET nombre = ? WHERE id = ?', [nombre, id], (error, resultado)=> {
//             if (error){
//                 reject(error);
//             }else{
//                 resolve(resultado.insertId);
//             }
//         })
//     })
// }

// function borrarTarea(id){
//     return new Promise((resolve, reject)=> {
//         conexion.query('DELETE FROM tareas WHERE id = ?', [id], (error, resultado) => {
//             if( error){
//                 reject(error);
//             }else {
//                 resolve(resultado);
//             }
//         })
//     })
// }