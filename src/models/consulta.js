const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
};

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
};

exports.addConsulta= async ({ Fecha_Consulta, DPI_Paciente}) => {
    const query = `INSERT INTO Consulta (Fecha_Consulta, DPI_Paciente) VALUES ('${Fecha_Consulta}', ${DPI_Paciente})`;
    await guardarEnBaseDatos(query);
}