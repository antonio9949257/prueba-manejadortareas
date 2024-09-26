const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usuarioModelo = require('../models/usuarioModelo')
require('dotenv').config();



async function registrarUsuario(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'El usuario y la contraseña son obligatorios' });
    }

    try {
        const usuarioExistente = await usuarioModelo.buscarUsuarioPorNombre(username);
        if (usuarioExistente) {
            return res.status(400).json({ message: 'El nombre de usuario ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const usuarioId = await usuarioModelo.crearUsuario(username, hashedPassword);

        const token = jwt.sign({ id: usuarioId, username }, process.env.SECRET_KEY , { expiresIn: '1h' });

        res.status(201).json({ message: 'Usuario creado', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
}

async function iniciarSesion(req,res){
    const  {username, password}= req.body;

    if (!username || !password){
        return res.status(400).json({ message: 'El usuario y la contraseña son obligatorios' })
    }

    try {
        const usuario = await usuarioModelo.buscarUsuarioPorNombre(username)
        if (!usuario){
            return res.status(400).json({
                message: 'usuario no encontrado'
            })
        }
//recomendacion no enviar mensajes especificos como nombre y contrase. mejor uno generico: suario o contraseña incorrectos
        const esValido = await bcrypt.compare(password, usuario.password)
        if(!esValido){
            return res.status(400).json({
                message: 'Contraseña incorrecta'
            })
        }

        const token = jwt.sign({ id: usuario.id, username: usuario.username}, process.env.SECRET_KEY, {
            expiresIn: '1h'
        })
        
        res.status(200).json({ message: 'Inicio de sesion exitoso', token })
    } catch (error){
        console.log(error)
        res.status(500).json({ message: 'Error al iniciar sesion' })
    }
}

async function cerrarSesion(req, res) {
    res.clearCookie('token')
    res.status(200).json({ message: 'Sesion Cerrada correctamente' })
}

module.exports = { 
    registrarUsuario,
    iniciarSesion,
    cerrarSesion
};