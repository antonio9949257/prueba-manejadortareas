const db = require('../../config/db');

function buscarUsuarioPorNombre(username) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM usuarios WHERE username = ?', [username], (error, resultado) => {
            if (error) {
                reject(error);
            } else {
                resolve(resultado[0]); 
            }
        });
    });
}

function crearUsuario(username, password) {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, password], (error, resultado) => {
            if (error) {
                reject(error);
            } else {
                resolve(resultado.insertId);  
            }
        });
    });
}

module.exports = { buscarUsuarioPorNombre, crearUsuario };
