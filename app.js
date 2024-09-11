//http://expressjs.com/en/starter/hello-world.html
const express = require('express');
const app =  express();
const mysql = require('mysql')
const cors = require('cors')


const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2147',
    database: 'ManejadorTareas'
})

conexion.connect();

const puerto = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static('publico'));

app.listen(puerto, () => {
    console.log(`Servidor ejecutando en http://localhost:${puerto}`);
});

// Rutas
app.get('/api/tareas/', obtenerTareas);
app.post('/api/tareas/', crearTareas);

// Controlador
async function obtenerTareas(req, res) {
    try {
        const tareas = await obtenerAllTareas();
        res.status(200).json(tareas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
}

async function crearTareas(req, res) {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).json({ message: 'El nombre de la tarea es obligatorio' });
    }
    try {
        const tareaId = await crearTarea(nombre);
        res.status(201).json({ message: 'Tarea creada', tareaId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
}

// Modelo
function obtenerAllTareas() {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM tareas', (error, resultado) => {  // Corrección de 'form' a 'from'
            if (error) {
                reject(error);
            } else {
                resolve(resultado);
            }
        });
    });
}

function crearTarea(nombre) {
    return new Promise((resolve, reject) => {
        conexion.query('INSERT INTO tareas (nombre) VALUES (?)', [nombre], (error, resultado) => {  // Corrección de paréntesis
            if (error) {
                reject(error);
            } else {
                resolve(resultado);
            }
        });
    });
}