const pool = require('../keys');

const guardarEnBaseDatos = async (querySQLServer) => {
    return ejecutarSQLServer(querySQLServer);
};

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    return conSQL.request().query(query);
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

exports.deleteMunicipio = async (id) => {
    const query = `DELETE FROM Municipio WHERE Id_Municipio = ${id}`;
    await guardarEnBaseDatos(query);
};

exports.getMunicipioWithDepartamento = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`
        SELECT Municipio.Id_Municipio, Municipio.Nombre_Municipio, Departamento.Nombre_Departamento
        FROM Municipio
        JOIN Departamento ON Municipio.Id_Departamento = Departamento.Id_Departamento
    `);
    return result.recordset;
};