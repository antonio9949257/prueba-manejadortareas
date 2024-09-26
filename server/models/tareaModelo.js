const db = require('../../config/db');

function obtenerAllTareas(usuarioId) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tareas WHERE usuario_id = ?', [usuarioId], (error, resultado) => {
            if (error) {
                reject(error);
            } else {
                resolve(resultado);
            }
        });
    });
}

function crearTarea(nombre, usuarioId) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO tareas (nombre, usuario_id) VALUES (?, ?)', [nombre, usuarioId], (error, resultado) => {
            if (error) {
                reject(error);
            } else {
                resolve(resultado.insertId); 
            }
        });
    });
}

function actualizarTarea(id, nombre, usuarioId) {
    return new Promise((resolve, reject) => {
        db.query('UPDATE tareas SET nombre = ? WHERE id = ? AND usuario_id = ?', [nombre, id, usuarioId], (error, resultado) => {
            if (error) {
                reject(error);
            } else {
                resolve(resultado.affectedRows > 0); // Devolver si se actualizó algo
            }
        });
    });
}

function borrarTarea(id, usuarioId) {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM tareas WHERE id = ? AND usuario_id = ?', [id, usuarioId], (error, resultado) => {
            if (error) {
                reject(error);
            } else {
                resolve(resultado.affectedRows > 0); // Devolver si se eliminó algo
            }
        });
    });
}

module.exports = {
    obtenerAllTareas,
    crearTarea,
    actualizarTarea,
    borrarTarea
};
