const pool = require('../keys');

const guardarEnBaseDatos = async (querySQLServer) => {
    return ejecutarSQLServer(querySQLServer);
};

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    return conSQL.request().query(query);
};

exports.addConsulta= async ({ Fecha_Consulta, DPI_Paciente}) => {
    const query = `INSERT INTO Consulta (Fecha_Consulta, DPI_Paciente) VALUES ('${Fecha_Consulta}', ${DPI_Paciente})`;
    await guardarEnBaseDatos(query);
}

exports.getConsulta = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Consulta');
    return result.recordset;
};

exports.updateConsulta = async ({ Id_Consulta, Fecha_Consulta, DPI_Paciente }) => {
    const query = `
        UPDATE Consulta
        SET Fecha_Consulta = '${Fecha_Consulta}',
        DPI_Paciente = '${DPI_Paciente}'
        WHERE Id_Consulta = ${Id_Consulta}`;
    await guardarEnBaseDatos(query);
};  

exports.getConsultaById = async (id) => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`SELECT * FROM Consulta WHERE Id_Consulta = ${id}`);
    return result.recordset[0];
};

exports.deleteConsulta = async (id) => {
    const query = `DELETE FROM Consulta WHERE Id_Consulta = ${id}`;
    await guardarEnBaseDatos(query);
};