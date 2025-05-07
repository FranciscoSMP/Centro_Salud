const pool = require('../keys');

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    await conSQL.request().query(query);
};

const guardarEnBaseDatos = async (querySQLServer) => {
    ejecutarSQLServer(querySQLServer)
};

exports.addPaciente= async ({ DPI, Primer_nombre, Segundo_nombre, Tercer_nombre, Primer_apellido, Segundo_apellido, Fecha_nacimiento, Telefono, IGSS, Genero, Id_Escolaridad, Id_Comunidad_Linguistica, Id_Profesion, Id_Disapacidad, Id_Control, Id_Pueblo, Id_Municipio, Id_Departamento }) => {
    const query = `INSERT INTO Paciente (DPI, Primer_nombre, Segundo_nombre, Tercer_nombre, Primer_apellido, Segundo_apellido, Fecha_nacimiento, Telefono, IGSS, Genero, Id_Escolaridad, Id_Comunidad_Linguistica, Id_Profesion, Id_Disapacidad, Id_Control, Id_Pueblo, Id_Municipio, Id_Departamento) 
    VALUES ('${DPI}', '${Primer_nombre}', '${Segundo_nombre}', '${Tercer_nombre}', '${Primer_apellido}', '${Segundo_apellido}', '${Fecha_nacimiento}', '${Telefono}', '${IGSS}', '${Genero}', ${Id_Escolaridad}, ${Id_Comunidad_Linguistica}, ${Id_Profesion}, ${Id_Disapacidad}, ${Id_Control}, ${Id_Pueblo}, ${Id_Municipio}, ${Id_Departamento})`;
    await guardarEnBaseDatos(query);
};

exports.getPaciente = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query('SELECT * FROM Paciente');
    return result.recordset;
};