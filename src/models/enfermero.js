const pool = require('../keys');

const guardarEnBaseDatos = async (querySQLServer) => {
    return ejecutarSQLServer(querySQLServer);
};

const ejecutarSQLServer = async (query) => {
    const conSQL = await pool.poolPromise;
    return conSQL.request().query(query);
};

exports.addEnfermero= async ({ DPI_Enfermero, Primer_Nombre, Segundo_Nombre, Tercer_Nombre, Primer_Apellido, Segundo_Apellido, Id_Municipio }) => {
    const query = `INSERT INTO Enfermero (DPI_Enfermero, Primer_Nombre, Segundo_Nombre, Tercer_Nombre, Primer_Apellido, Segundo_Apellido, Id_Municipio) VALUES ('${DPI_Enfermero}', '${Primer_Nombre}', '${Segundo_Nombre}', '${Tercer_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', ${Id_Municipio})`;
    await guardarEnBaseDatos(query);
};

exports.getEnfermero = async () => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`
        SELECT 
        Enfermero.DPI_Enfermero, 
        Enfermero.Primer_Nombre, 
        Enfermero.Segundo_Nombre, 
        Enfermero.Tercer_Nombre, 
        Enfermero.Primer_Apellido,
        Enfermero.Segundo_Apellido,
        Municipio.Nombre_Municipio
        FROM Enfermero
        JOIN Municipio ON Municipio.Id_Municipio = Municipio.Id_Departamento
        `);
    return result.recordset;
};

exports.deleteEnfermero = async (id) => {
    const query = `DELETE FROM Enfermero WHERE DPI_Enfermero = ${id}`;
    await guardarEnBaseDatos(query);
};


exports.updateEnfermero = async ({ DPI_Enfermero, Primer_Nombre, Segundo_Nombre, Tercer_Nombre, Primer_Apellido, Segundo_Apellido, Id_Municipio }) => {
    const query = `
        UPDATE Enfermero
        SET Primer_Nombre = '${Primer_Nombre}',
        Segundo_Nombre = '${Segundo_Nombre}',
        Tercer_Nombre = '${Tercer_Nombre}',
        Primer_Apellido = '${Primer_Apellido}',
        Segundo_Apellido = '${Segundo_Apellido}',
        Id_Municipio = ${Id_Municipio}
        WHERE DPI_Enfermero = '${DPI_Enfermero}'`;
    await guardarEnBaseDatos(query);
};  

exports.getEnfermeroById = async (id) => {
    const conSQL = await pool.poolPromise;
    const result = await conSQL.request().query(`SELECT * FROM Enfermero WHERE DPI_Enfermero = ${id}`);
    return result.recordset[0];
};