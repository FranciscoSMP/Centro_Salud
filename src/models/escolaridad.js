const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
};

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
};

exports.addEscolaridad= async ({ Nivel_Escolaridad }) => {
    const query = `INSERT INTO Escolaridad (Nivel_Escolaridad) VALUES ('${Nivel_Escolaridad}')`;
    await guardarEnBaseDatos(query);
}

exports.getEscolaridad = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Escolaridad');
    return result.recordset;
};