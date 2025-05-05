const bcrypt = require('bcryptjs');
const sql = require('mssql');

// Configuración de la conexión a SQL Server
const config = {
    user: 'sa',
    password: 'r62af79a',
    server: 'LAPTOP-C6AMNR9V\\SQLEXPRESS', // Cambia a tu servidor
    //server: 'VIRTUALPC\\SQLEXPRESS', // Cambia a tu servidor  
    database: 'Centro_Salud',
    options: {
        encrypt: false, // Cambia si es necesario
        trustServerCertificate: true // Cambia si es necesario
    }
};

// Función para agregar un nuevo usuario a la base de datos
async function agregarUsuario(nombreUsuario, contrasenia, idRol) {
    try {
        // Encriptar la contraseña
        const saltRounds = 10;
        const contraseniaEncriptada = await bcrypt.hash(contrasenia, saltRounds);

        console.log('Contraseña encriptada:', contraseniaEncriptada);

        // Conectarse a la base de datos
        await sql.connect(config);

        // Preparar y ejecutar la consulta
        const request = new sql.Request();
        request.input('Nombre_Usuario', sql.VarChar, nombreUsuario);
        request.input('Contrasenia', sql.VarChar, contraseniaEncriptada);
        request.input('Id_Rol', sql.Int, idRol);

        const result = await request.query(`
            INSERT INTO Usuario (Nombre_Usuario, Contrasenia, Id_Rol)
            VALUES (@Nombre_Usuario, @Contrasenia, @Id_Rol);
        `);

        console.log('Usuario agregado exitosamente.');
        console.log('Resultado de la consulta:', result);
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
    } finally {
        // Cerrar la conexión a la base de datos
        await sql.close();
    }
}

// Ejemplo de uso
const nombreUsuario = 'admin';
const contrasenia = 'r62af79a';
const idRol = 1;

agregarUsuario(nombreUsuario, contrasenia, idRol);
