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

exports.updatePaciente = async ({ DPI, Primer_nombre, Segundo_nombre, Tercer_nombre, Primer_apellido, Segundo_apellido, Fecha_nacimiento, Telefono, IGSS, Genero, Id_Escolaridad, Id_Comunidad_Linguistica, Id_Profesion, Id_Disapacidad, Id_Control, Id_Pueblo, Id_Municipio, Id_Departamento }) => {
    const query = `
        UPDATE Paciente
        SET Primer_nombre = '${Primer_nombre}',
        Segundo_nombre = '${Segundo_nombre}',
        Tercer_nombre = '${Tercer_nombre}',
        Primer_apellido = '${Primer_apellido}',
        Segundo_apellido = '${Segundo_apellido}',
        Fecha_nacimiento = '${Fecha_nacimiento}',
        Telefono = '${Telefono}',
        IGSS = '${IGSS}',
        Genero = '${Genero}',
        Id_Escolaridad = ${Id_Escolaridad},
        Id_Comunidad_Linguistica = ${Id_Comunidad_Linguistica},
        Id_Profesion = ${Id_Profesion},
        Id_Disapacidad = ${Id_Disapacidad},
        Id_Control = ${Id_Control},
        Id_Pueblo = ${Id_Pueblo},
        Id_Municipio = ${Id_Municipio},
        Id_Departamento = ${Id_Departamento}
        WHERE DPI = ${DPI}`;
    await guardarEnBaseDatos(query);
};  

exports.getPacienteById = async (id) => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`SELECT * FROM Paciente WHERE DPI = ${id}`);
    return result.recordset[0];
};

exports.deletePaciente  = async (id) => {
    const query = `DELETE FROM Paciente WHERE DPI = ${id}`;
    await guardarEnBaseDatos(query);
};