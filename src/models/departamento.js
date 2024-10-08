const pool = require('../keys');

const guardarEnBaseDatos = async (querySQLServer) => {
    return ejecutarSQLServer(querySQLServer);
};

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    return conSQL.request().query(query);
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

exports.updateDepartamento = async ({ Id_Departamento, Nombre_Departamento}) => {
    const query = `
        UPDATE Departamento
        SET Nombre_Departamento = '${Nombre_Departamento}'
        WHERE Id_Departamento = ${Id_Departamento}`;
    await guardarEnBaseDatos(query);
};  

exports.getDepartamentoById = async (id) => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`SELECT * FROM Departamento WHERE Id_Departamento = ${id}`);
    return result.recordset[0];
};

exports.deleteDepartamento = async (id) => {
    const query = `DELETE FROM Departamento WHERE Id_Departamento = ${id}`;
    await guardarEnBaseDatos(query);
};