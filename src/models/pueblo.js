const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
};

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
};

exports.addPueblo= async ({ Nombre_Pueblo }) => {
    const query = `INSERT INTO Pueblo (Nombre_Pueblo) VALUES ('${Nombre_Pueblo}')`;
    await guardarEnBaseDatos(query);
};

exports.getPueblo = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Pueblo');
    return result.recordset;
};