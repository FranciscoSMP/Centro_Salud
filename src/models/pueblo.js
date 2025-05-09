const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
};

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
};

exports.addPueblo= async ({ Nombre_Pueblo }) => {
    const query = `INSERT INTO Pueblo (Nombre_Pueblo) VALUES ('${Nombre_Pueblo}')`;
    await guardarEnBaseDatos(query);
};

exports.getPueblo = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Pueblo');
    return result.recordset;
};

exports.updatePueblo = async ({ Id_Pueblo, Nombre_Pueblo}) => {
    const query = `
        UPDATE Pueblo
        SET Nombre_Pueblo = '${Nombre_Pueblo}'
        WHERE Id_Pueblo = ${Id_Pueblo}`;
    await guardarEnBaseDatos(query);
};  

exports.getPuebloById = async (id) => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`SELECT * FROM Pueblo WHERE Id_Pueblo = ${id}`);
    return result.recordset[0];
};

exports.deletePueblo = async (id) => {
    const query = `DELETE FROM Pueblo WHERE Id_Pueblo = ${id}`;
    await guardarEnBaseDatos(query);
};