const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'r62af79a',
    //server: 'LAPTOP-C6AMNR9V\\SQLEXPRESS',
    server: 'VIRTUALPC\\SQLEXPRESS',
    database: 'Centro_Salud',
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a la base de datos SQL Server');
        return pool;
    })
    .catch(err => console.log('Error en la conexión a la base de datos: ', err));

module.exports = { sql, poolPromise };
