const pool = require('../keys');

const guardarEnBaseDatos = async (querySQLServer) => {
    return ejecutarSQLServer(querySQLServer);
};

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    return conSQL.request().query(query);
};

exports.addTipo_Consulta= async ({ Fecha_Consulta, Tipo_Consulta}) => {
    const query = `INSERT INTO Tipo_Consulta (Fecha_Consulta, Tipo_Consulta) VALUES ('${Fecha_Consulta}', '${Tipo_Consulta}')`;
    await guardarEnBaseDatos(query);
}

exports.getTipo_Consulta = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Tipo_Consulta');
    return result.recordset;
};

exports.updateTipo_Consulta = async ({ Id_Consulta, Fecha_Consulta, Tipo_Consulta }) => {
    const query = `
        UPDATE Tipo_Consulta
        SET Fecha_Consulta = '${Fecha_Consulta}',
        Tipo_Consulta = '${Tipo_Consulta}'
        WHERE Id_Consulta = ${Id_Consulta}`;
    await guardarEnBaseDatos(query);
};  

exports.getTipo_ConsultaById = async (id) => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`SELECT * FROM Tipo_Consulta WHERE Id_Consulta = ${id}`);
    return result.recordset[0];
};

exports.deleteTipo_Consulta = async (id) => {
    const query = `DELETE FROM Tipo_Consulta WHERE Id_Consulta = ${id}`;
    await guardarEnBaseDatos(query);
};