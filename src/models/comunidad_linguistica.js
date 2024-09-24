const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
};

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
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
