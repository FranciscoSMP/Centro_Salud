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