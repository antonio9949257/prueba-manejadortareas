const tareaModelo = require('../models/tareaModelo.js');

async function obtenerTareas(req, res) {
    try {
        const usuarioId = req.user.id; 
        const tareas = await tareaModelo.obtenerAllTareas(usuarioId);
        res.status(200).json(tareas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
}

async function crearTareas(req, res) {
    const { nombre } = req.body;
    const usuarioId = req.user.id; 

    if (!nombre) {
        return res.status(400).json({ message: 'El nombre de la tarea es obligatorio' });
    }

    try {
        const tareaId = await tareaModelo.crearTarea(nombre, usuarioId); 
        res.status(201).json({ message: 'Tarea creada', tareaId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
}

async function editarTarea(req, res) {
    const { id } = req.params;
    const { nombre } = req.body;
    const usuarioId = req.user.id;

    if (!nombre) {
        return res.status(400).json({ message: 'El nombre de la tarea es obligatoria' });
    }

    try {
        const updated = await tareaModelo.actualizarTarea(id, nombre, usuarioId); 
        if (updated) {
            res.status(200).json({ message: 'Tarea actualizada' });
        } else {
            res.status(404).json({ message: 'Tarea no encontrada o no pertenece al usuario' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
}

async function eliminarTarea(req, res) {
    const { id } = req.params;
    const usuarioId = req.user.id; 

    try {
        const deleted = await tareaModelo.borrarTarea(id, usuarioId); 
        if (deleted) {
            res.status(200).json({ message: 'Tarea eliminada' });
        } else {
            res.status(404).json({ message: 'Tarea no encontrada o no pertenece al usuario' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
}

module.exports = {
    obtenerTareas,
    editarTarea,
    crearTareas,
    eliminarTarea
};
