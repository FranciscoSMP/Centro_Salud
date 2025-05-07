const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
};

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
};

exports.addPacienteConsulta = async ({ DPI_Paciente, Id_Consulta }) => {
    const query = `INSERT INTO Paciente_Consulta (DPI_Paciente, Id_Consulta) 
    VALUES ('${DPI_Paciente}', ${Id_Consulta})`;
    await guardarEnBaseDatos(query);
};

exports.getPacienteConsulta = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Paciente_Consulta');
    return result.recordset;
};