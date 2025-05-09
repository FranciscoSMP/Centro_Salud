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

exports.updateControl = async ({ Id_Control, Tipo_Control}) => {
    const query = `
        UPDATE Control
        SET Tipo_Control = '${Tipo_Control}'
        WHERE Id_Control = ${Id_Control}`;
    await guardarEnBaseDatos(query);
};  

exports.getControlById = async (id) => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`SELECT * FROM Control WHERE Id_Control = ${id}`);
    return result.recordset[0];
};

exports.deleteControl = async (id) => {
    const query = `DELETE FROM Control WHERE Id_Control = ${id}`;
    await guardarEnBaseDatos(query);
};