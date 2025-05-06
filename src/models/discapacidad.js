const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
}

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
}

exports.addDiscapacidad= async ({ Tipo_Discapacidad }) => {
    const query = `INSERT INTO Discapacidad (Tipo_Discapacidad) VALUES ('${Tipo_Discapacidad}')`;
    await guardarEnBaseDatos(query);
}