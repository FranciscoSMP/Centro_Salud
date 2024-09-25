const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
};

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
};

exports.addDepartamento= async ({ Nombre_Departamento }) => {
    const query = `INSERT INTO Departamento (Nombre_Departamento) VALUES ('${Nombre_Departamento}')`;
    await guardarEnBaseDatos(query);
};

exports.getDepartamento = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Departamento');
    return result.recordset;
};