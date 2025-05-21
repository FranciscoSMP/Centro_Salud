const pool = require('../keys');

const guardarEnBaseDatos = async (querySQLServer) => {
    return ejecutarSQLServer(querySQLServer);
};

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    return conSQL.request().query(query);
};

exports.addPaciente = async ({ DPI, Primer_nombre, Segundo_nombre, Tercer_nombre, Primer_apellido, Segundo_apellido, Fecha_nacimiento, Telefono, IGSS, Genero, Id_Escolaridad, Id_Comunidad_Linguistica, Id_Profesion, Id_Discapacidad, Id_Pueblo, Id_Municipio, Id_Departamento }) => {
    const query = `INSERT INTO Paciente (DPI, Primer_nombre, Segundo_nombre, Tercer_nombre, Primer_apellido, Segundo_apellido, Fecha_nacimiento, Telefono, IGSS, Genero, Id_Escolaridad, Id_Comunidad_Linguistica, Id_Profesion, Id_Discapacidad, Id_Pueblo, Id_Municipio, Id_Departamento) 
    VALUES ('${DPI}', '${Primer_nombre}', '${Segundo_nombre}', '${Tercer_nombre}', '${Primer_apellido}', '${Segundo_apellido}', '${Fecha_nacimiento}', '${Telefono}', '${IGSS}', '${Genero}', ${Id_Escolaridad}, ${Id_Comunidad_Linguistica}, ${Id_Profesion}, ${Id_Discapacidad}, ${Id_Pueblo}, ${Id_Municipio}, ${Id_Departamento})`;
    await guardarEnBaseDatos(query);
};

exports.updatePaciente = async ({ DPI, Primer_nombre, Segundo_nombre, Tercer_nombre, Primer_apellido, Segundo_apellido, Fecha_nacimiento, Telefono, IGSS, Genero, Id_Escolaridad, Id_Comunidad_Linguistica, Id_Profesion, Id_Discapacidad, Id_Pueblo, Id_Municipio, Id_Departamento }) => {
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
        Id_Discapacidad = ${Id_Discapacidad},
        Id_Pueblo = ${Id_Pueblo},
        Id_Municipio = ${Id_Municipio},
        Id_Departamento = ${Id_Departamento}
        WHERE DPI = '${DPI}'`;
    await guardarEnBaseDatos(query);
};

exports.getPacienteById = async (id) => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`SELECT * FROM Paciente WHERE DPI = '${id}'`);
    return result.recordset[0];
};

exports.deletePaciente = async (id) => {
    const query = `DELETE FROM Paciente WHERE DPI = '${id}'`;
    await guardarEnBaseDatos(query);
};

exports.getPaciente = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`
        SELECT 
        Paciente.DPI,
        Paciente.Primer_nombre,
        Paciente.Segundo_nombre,
        Paciente.Tercer_nombre,
        Paciente.Primer_apellido,
        Paciente.Segundo_apellido,
        Paciente.Fecha_nacimiento,
        Paciente.Telefono,
        Paciente.IGSS,
        Paciente.Genero,
        Escolaridad.Nivel_Escolaridad,
        Comunidad_Linguistica.Nombre_Comunidad_Linguistica,
        Profesion.Profesion_Oficio,
        Discapacidad.Tipo_Discapacidad,
        Pueblo.Nombre_Pueblo,
        Municipio.Nombre_Municipio,
        Departamento.Nombre_Departamento
        FROM Paciente
        JOIN Escolaridad ON Paciente.Id_Escolaridad = Escolaridad.Id_Escolaridad
        JOIN Comunidad_Linguistica ON Paciente.Id_Comunidad_Linguistica = Comunidad_Linguistica.Id_Comunidad_Linguistica
        JOIN Profesion ON Paciente.Id_Profesion = Profesion.Id_Profesion
        JOIN Discapacidad ON Paciente.Id_Discapacidad = Discapacidad.Id_Discapacidad
        JOIN Pueblo ON Paciente.Id_Pueblo = Pueblo.Id_Pueblo
        JOIN Municipio ON Paciente.Id_Municipio = Municipio.Id_Municipio
        JOIN Departamento ON Paciente.Id_Departamento = Departamento.Id_Departamento
    `);
    return result.recordset;
};