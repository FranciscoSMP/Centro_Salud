const pool = require('../keys');

const guardarEnBaseDatos = async (querySQLServer) => {
    return ejecutarSQLServer(querySQLServer);
}

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    return conSQL.request().query(query);
}

exports.addDiscapacidad= async ({ Tipo_Discapacidad }) => {
    const query = `INSERT INTO Discapacidad (Tipo_Discapacidad) VALUES ('${Tipo_Discapacidad}')`;
    await guardarEnBaseDatos(query);
}

exports.getDiscapacidad = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Discapacidad');
    return result.recordset;
};

exports.updateDiscapcidad = async ({ Id_Discapacidad, Tipo_Discapacidad }) => {
    const query = `
        UPDATE Discapacidad
        SET Tipo_Discapacidad = '${Tipo_Discapacidad}'
        WHERE Id_Discapacidad = ${Id_Discapacidad}`;
    await guardarEnBaseDatos(query);
};  

exports.getDiscapacidadById = async (id) => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`SELECT * FROM Discapacidad WHERE Id_Discapacidad = ${id}`);
    return result.recordset[0];
};

exports.deleteDiscapacidad = async (id) => {
    const query = `DELETE FROM Discapacidad WHERE Id_Discapacidad = ${id}`;
    await guardarEnBaseDatos(query);
};