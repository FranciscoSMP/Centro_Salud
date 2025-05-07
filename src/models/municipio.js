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

exports.getMunicipio = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Municipio');
    return result.recordset;
};

exports.updateMunicipio = async ({ Id_Municipio, Nombre_Municipio, Id_Departamento }) => {
    const query = `
        UPDATE Municipio
        SET Nombre_Municipio = '${Nombre_Municipio}',
        Id_Departamento = ${Id_Departamento}
        WHERE Id_Municipio = ${Id_Municipio}`;
    await guardarEnBaseDatos(query);
};  

exports.getMunicipioById = async (id) => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`SELECT * FROM Municipio WHERE Id_Municipio = ${id}`);
    return result.recordset[0];
};