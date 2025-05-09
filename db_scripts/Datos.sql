-- Insertar datos en la tabla Departamento
INSERT INTO Departamento (Nombre_Departamento) VALUES ('Guatemala');
INSERT INTO Departamento (Nombre_Departamento) VALUES ('Quetzaltenango');
INSERT INTO Departamento (Nombre_Departamento) VALUES ('Sacatepéquez');

-- Insertar datos en la tabla Municipio
INSERT INTO Municipio (Nombre_Municipio, Id_Departamento) VALUES ('Guatemala', 1);
INSERT INTO Municipio (Nombre_Municipio, Id_Departamento) VALUES ('Quetzaltenango', 2);
INSERT INTO Municipio (Nombre_Municipio, Id_Departamento) VALUES ('Antigua Guatemala', 3);

-- Insertar datos en la tabla Pueblo
INSERT INTO Pueblo (Nombre_Pueblo) VALUES ('Maya');
INSERT INTO Pueblo (Nombre_Pueblo) VALUES ('Garífuna');
INSERT INTO Pueblo (Nombre_Pueblo) VALUES ('Xinca');

-- Insertar datos en la tabla Control
INSERT INTO Control (Tipo_Control) VALUES ('Diabetes');
INSERT INTO Control (Tipo_Control) VALUES ('Hipertensión');
INSERT INTO Control (Tipo_Control) VALUES ('Control Prenatal');

-- Insertar datos en la tabla Discapacidad
INSERT INTO Discapacidad (Tipo_Discapacidad) VALUES ('Auditiva');
INSERT INTO Discapacidad (Tipo_Discapacidad) VALUES ('Visual');
INSERT INTO Discapacidad (Tipo_Discapacidad) VALUES ('Motora');

-- Insertar datos en la tabla Profesion
INSERT INTO Profesion (Profesion_Oficio) VALUES ('Médico');
INSERT INTO Profesion (Profesion_Oficio) VALUES ('Ingeniero');
INSERT INTO Profesion (Profesion_Oficio) VALUES ('Maestro');

-- Insertar datos en la tabla Comunidad_Linguistica
INSERT INTO Comunidad_Linguistica (Nombre_Comunidad_Linguistica) VALUES ('Kiche');
INSERT INTO Comunidad_Linguistica (Nombre_Comunidad_Linguistica) VALUES ('Qeqchi');
INSERT INTO Comunidad_Linguistica (Nombre_Comunidad_Linguistica) VALUES ('Kaqchikel');

-- Insertar datos en la tabla Escolaridad
INSERT INTO Escolaridad (Nivel_Escolaridad) VALUES ('Primaria');
INSERT INTO Escolaridad (Nivel_Escolaridad) VALUES ('Secundaria');
INSERT INTO Escolaridad (Nivel_Escolaridad) VALUES ('Universidad');

-- Insertar datos en la tabla Paciente
INSERT INTO Paciente (DPI, Primer_nombre, Segundo_nombre, Tercer_nombre, Primer_apellido, Segundo_apellido, Fecha_nacimiento, Telefono, IGSS, Genero, Id_Escolaridad, Id_Comunidad_Linguistica, Id_Profesion, Id_Disapacidad, Id_Control, Id_Pueblo, Id_Municipio, Id_Departamento)
VALUES ('1234567890123', 'Juan', 'Carlos', NULL, 'Perez', 'Garcia', '1980-01-01', '12345678', 'S', 'M', 1, 1, 1, 1, 1, 1, 1, 1);
INSERT INTO Paciente (DPI, Primer_nombre, Segundo_nombre, Tercer_nombre, Primer_apellido, Segundo_apellido, Fecha_nacimiento, Telefono, IGSS, Genero, Id_Escolaridad, Id_Comunidad_Linguistica, Id_Profesion, Id_Disapacidad, Id_Control, Id_Pueblo, Id_Municipio, Id_Departamento)
VALUES ('2345678901234', 'Maria', 'Fernanda', NULL, 'Lopez', 'Ruiz', '1990-02-02', '87654321', 'N', 'F', 2, 2, 2, 2, 2, 2, 2, 2);
INSERT INTO Paciente (DPI, Primer_nombre, Segundo_nombre, Tercer_nombre, Primer_apellido, Segundo_apellido, Fecha_nacimiento, Telefono, IGSS, Genero, Id_Escolaridad, Id_Comunidad_Linguistica, Id_Profesion, Id_Disapacidad, Id_Control, Id_Pueblo, Id_Municipio, Id_Departamento)
VALUES ('3456789012345', 'Pedro', 'Antonio', NULL, 'Ramirez', 'Soto', '1985-03-03', '56789012', 'S', 'M', 3, 3, 3, 3, 3, 3, 3, 3);

-- Insertar datos en la tabla Consulta
INSERT INTO Consulta (Fecha_Consulta, DPI_Paciente) VALUES ('2024-01-01', '1234567890123');
INSERT INTO Consulta (Fecha_Consulta, DPI_Paciente) VALUES ('2024-02-01', '2345678901234');
INSERT INTO Consulta (Fecha_Consulta, DPI_Paciente) VALUES ('2024-03-01', '3456789012345');

-- Insertar datos en la tabla Paciente_Consulta
INSERT INTO Paciente_Consulta (DPI_Paciente, Id_Consulta) VALUES ('1234567890123', 1);
INSERT INTO Paciente_Consulta (DPI_Paciente, Id_Consulta) VALUES ('2345678901234', 2);
INSERT INTO Paciente_Consulta (DPI_Paciente, Id_Consulta) VALUES ('3456789012345', 3);

-- Insertar datos en la tabla Enfermero
INSERT INTO Enfermero (DPI_Enfermero, Primer_Nombre, Segundo_Nombre, Tercer_Nombre, Primer_Apellido, Segundo_Apellido, Id_Municipio)
VALUES ('9876543210123', 'Carlos', 'Enrique', NULL, 'Rodriguez', 'Martinez', 1);
INSERT INTO Enfermero (DPI_Enfermero, Primer_Nombre, Segundo_Nombre, Tercer_Nombre, Primer_Apellido, Segundo_Apellido, Id_Municipio)
VALUES ('8765432101234', 'Ana', 'Lucia', NULL, 'Gomez', 'Perez', 2);
INSERT INTO Enfermero (DPI_Enfermero, Primer_Nombre, Segundo_Nombre, Tercer_Nombre, Primer_Apellido, Segundo_Apellido, Id_Municipio)
VALUES ('7654321012345', 'Luis', 'Fernando', NULL, 'Sanchez', 'Lopez', 3);