const bcrypt = require('bcryptjs');
const { sql, poolPromise } = require('../src/keys');

async function agregarUsuario(nombreUsuario, contrasenia, idRol) {
    try {
        const saltRounds = 10;
        const contraseniaEncriptada = await bcrypt.hash(contrasenia, saltRounds);

        console.log('Contraseña encriptada:', contraseniaEncriptada);
              
        const pool = await poolPromise;

        const request = pool.request();
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
        await sql.close();
    }
}

const nombreUsuario = 'admin';
const contrasenia = 'r62af79a';
const idRol = 1;

agregarUsuario(nombreUsuario, contrasenia, idRol);
