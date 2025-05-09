const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
};

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
};

exports.addProfesion= async ({ Profesion_Oficio }) => {
    const query = `INSERT INTO Profesion (Profesion_Oficio) VALUES ('${Profesion_Oficio}')`;
    await guardarEnBaseDatos(query);
};

exports.getProfesion = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Profesion');
    return result.recordset;
};

exports.updateProfesion = async ({ Id_Profesion, Profesion_Oficio }) => {
    const query = `
        UPDATE Profesion
        SET Profesion_Oficio = '${Profesion_Oficio}'
        WHERE Id_Profesion = ${Id_Profesion}`;
    await guardarEnBaseDatos(query);
};  

exports.getProfesionById = async (id) => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`SELECT * FROM Profesion WHERE Id_Profesion = ${id}`);
    return result.recordset[0];
};

exports.deleteProfesion = async (id) => {
    const query = `DELETE FROM Profesion WHERE Id_Profesion = ${id}`;
    await guardarEnBaseDatos(query);
};