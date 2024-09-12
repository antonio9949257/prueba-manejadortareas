const express = require('express')
const mssql = require('mssql')

const app = express()

const configuracion = {
    user : 'root',
    password: '2147',
    server: 'localhost',
    database: 'preubaSqlserver',
    Option : {
        encrypt: true, 
        trustServerCertificate: true
    }
}

const poolPromise = mssql.connect(configuracion).then(pool => {
    console.log('Conectado a SQL Server');
    return pool;
  }).catch(err => {
    console.error('Error al conectar a SQL Server:', err);
  });

// module.exports = { mssql, poolPromise };