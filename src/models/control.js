const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
};

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
};

exports.addControl= async ({ Tipo_Control }) => {
    const query = `INSERT INTO Control (Tipo_Control) VALUES ('${Tipo_Control}')`;
    await guardarEnBaseDatos(query);
};

exports.getControl = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Control');
    return result.recordset;
};