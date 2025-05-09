const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
};

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
};

exports.addEscolaridad= async ({ Nivel_Escolaridad }) => {
    const query = `INSERT INTO Escolaridad (Nivel_Escolaridad) VALUES ('${Nivel_Escolaridad}')`;
    await guardarEnBaseDatos(query);
}

exports.getEscolaridad = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Escolaridad');
    return result.recordset;
};

exports.updateEscolaridad  = async ({ Id_Escolaridad, Nivel_Escolaridad }) => {
    const query = `
        UPDATE Escolaridad
        SET Nivel_Escolaridad = '${Nivel_Escolaridad}'
        WHERE Id_Escolaridad = ${Id_Escolaridad}`;
    await guardarEnBaseDatos(query);
};  

exports.getEscolaridadById = async (id) => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`SELECT * FROM Escolaridad WHERE Id_Escolaridad = ${id}`);
    return result.recordset[0];
};

exports.deleteEscolaridad = async (id) => {
    const query = `DELETE FROM Escolaridad WHERE Id_Escolaridad = ${id}`;
    await guardarEnBaseDatos(query);
};