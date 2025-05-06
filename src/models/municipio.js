const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
};

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
};

exports.addMunicipio= async ({ Nombre_Municipio, Id_Departamento }) => {
    const query = `INSERT INTO Municipio (Nombre_Municipio, Id_Departamento) VALUES ('${Nombre_Municipio}', ${Id_Departamento})`;
    await guardarEnBaseDatos(query);
};