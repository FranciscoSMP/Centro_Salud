const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
};

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
};

exports.addEnfermero= async ({ DPI_Enfermero, Primer_Nombre, Segundo_Nombre, Tercer_Nombre, Primer_Apellido, Segundo_Apellido, Id_Municipio }) => {
    const query = `INSERT INTO Enfermero (DPI_Enfermero, Primer_Nombre, Segundo_Nombre, Tercer_Nombre, Primer_Apellido, Segundo_Apellido, Id_Municipio) VALUES ('${DPI_Enfermero}', '${Primer_Nombre}', '${Segundo_Nombre}', '${Tercer_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', ${Id_Municipio})`;
    await guardarEnBaseDatos(query);
};