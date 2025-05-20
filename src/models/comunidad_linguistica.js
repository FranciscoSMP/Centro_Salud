const pool = require('../keys');

const guardarEnBaseDatos = async (querySQLServer) => {
    return ejecutarSQLServer(querySQLServer);
};

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    return conSQL.request().query(query);
};

exports.addComunidad_Linguistica= async ({ Nombre_Comunidad_Linguistica }) => {
    const query = `INSERT INTO Comunidad_Linguistica (Nombre_Comunidad_Linguistica) VALUES ('${Nombre_Comunidad_Linguistica}')`;
    await guardarEnBaseDatos(query);
};

exports.getComunidad_Linguistica = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Comunidad_Linguistica');
    return result.recordset;
};

exports.updateComunidad_Linguistica = async ({ Id_Comunidad_Linguistica, Nombre_Comunidad_Linguistica }) => {
    const query = `
        UPDATE Comunidad_Linguistica
        SET Nombre_Comunidad_Linguistica = '${Nombre_Comunidad_Linguistica}'
        WHERE Id_Comunidad_Linguistica = ${Id_Comunidad_Linguistica}`;
    await guardarEnBaseDatos(query);
};  

exports.getComunidadById = async (id) => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`SELECT * FROM Comunidad_Linguistica WHERE Id_Comunidad_Linguistica = ${id}`);
    return result.recordset[0];
};

exports.deleteComunidad_Linguistica = async (id) => {
    const query = `DELETE FROM Comunidad_Linguistica WHERE Id_Comunidad_Linguistica = ${id}`;
    await guardarEnBaseDatos(query);
};
