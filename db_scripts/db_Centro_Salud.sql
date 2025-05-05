create database Centro_Salud
on primary (
			name='bd.CentroSalud', 
			filename='C:\basedatos\bd_centrosalud.mdf',
			size=8mb,
			maxsize=500mb,
			filegrowth=10mb
			)
log on
			(
			name='bd.centrosalud_log', 
			filename='C:\basedatos\bd_centrosalud.ldf',
			size=8mb,
			maxsize=100mb,
			filegrowth=10mb
			)

ALTER DATABASE Centro_Salud
ADD FILE 
(
name='bd.CENTROSALUD1', 
filename='C:\basedatos\bd_CENTROSALUD1.ndf',
size=8mb,
maxsize=500mb,
filegrowth=10mb
)

USE Centro_Salud;

CREATE TABLE Departamento(
    Id_Departamento INT PRIMARY KEY IDENTITY(1,1),
    Nombre_Departamento VARCHAR(50) NOT NULL
);

CREATE TABLE Municipio(
    Id_Municipio INT PRIMARY KEY IDENTITY(1,1),
    Nombre_Municipio VARCHAR(50) NOT NULL,
    Id_Departamento INT NOT NULL,
    FOREIGN KEY (Id_Departamento) REFERENCES Departamento(Id_Departamento)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

CREATE TABLE Pueblo (
    Id_Pueblo INT PRIMARY KEY IDENTITY(1,1),
    Nombre_Pueblo VARCHAR(50) NOT NULL
);

CREATE TABLE Control (
    Id_Control INT PRIMARY KEY IDENTITY(1,1),
    Tipo_Control VARCHAR(50) NOT NULL
);

CREATE TABLE Discapacidad (
    Id_Discapacidad INT PRIMARY KEY IDENTITY(1,1),
    Tipo_Discapacidad VARCHAR(50) NOT NULL
);

CREATE TABLE Profesion (
    Id_Profesion INT PRIMARY KEY IDENTITY(1,1),
    Profesion_Oficio VARCHAR(50) NOT NULL
);

CREATE TABLE Comunidad_Linguistica (
    Id_Comunidad_Linguistica INT PRIMARY KEY IDENTITY(1,1),
    Nombre_Comunidad_Linguistica VARCHAR(50) NOT NULL
);

CREATE TABLE Escolaridad (
    Id_Escolaridad INT PRIMARY KEY IDENTITY(1,1),
    Nivel_Escolaridad VARCHAR(50) NOT NULL
);

CREATE TABLE Paciente (
    DPI VARCHAR(13) PRIMARY KEY,
    Primer_nombre VARCHAR(50) NOT NULL,
    Segundo_nombre VARCHAR(50),
	Tercer_nombre VARCHAR(50),
    Primer_apellido VARCHAR(50) NOT NULL,
    Segundo_apellido VARCHAR(50),
    Fecha_nacimiento DATE NOT NULL,
    Telefono VARCHAR(8) NOT NULL,
    IGSS CHAR(1) NOT NULL CHECK (IGSS IN ('S', 'N')),
    Genero CHAR(1) NOT NULL CHECK (Genero IN ('M', 'F')),
    Id_Escolaridad INT NOT NULL,
    Id_Comunidad_Linguistica INT NOT NULL,
    Id_Profesion INT NOT NULL,
    Id_Disapacidad INT NOT NULL,
    Id_Control INT NOT NULL,
    Id_Pueblo INT NOT NULL,
    Id_Municipio INT NOT NULL,
    Id_Departamento INT NOT NULL,
    FOREIGN KEY (Id_Escolaridad) REFERENCES Escolaridad(Id_Escolaridad)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (Id_Comunidad_Linguistica) REFERENCES Comunidad_Linguistica(Id_Comunidad_Linguistica)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (Id_Profesion) REFERENCES Profesion(Id_Profesion)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (Id_Disapacidad) REFERENCES Discapacidad(Id_Discapacidad)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (Id_Control) REFERENCES Control(Id_Control)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (Id_Pueblo) REFERENCES Pueblo(Id_Pueblo)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (Id_Municipio) REFERENCES Municipio(Id_Municipio)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (Id_Departamento) REFERENCES Departamento(Id_Departamento)
);

CREATE TABLE Consulta(
    Id_Consulta INT PRIMARY KEY IDENTITY(1,1),
    Fecha_Consulta DATE NOT NULL,
    DPI_Paciente VARCHAR(13) NOT NULL,
    FOREIGN KEY (DPI_Paciente) REFERENCES Paciente(DPI)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

CREATE TABLE Paciente_Consulta(
	Paciente_Consulta INT PRIMARY KEY IDENTITY(1,1),
    DPI_Paciente VARCHAR(13) NOT NULL,
    Id_Consulta INT NOT NULL,
    FOREIGN KEY (DPI_Paciente) REFERENCES Paciente(DPI),
    FOREIGN KEY (Id_Consulta) REFERENCES Consulta(Id_Consulta)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

CREATE TABLE Enfermero (
    DPI_Enfermero VARCHAR(13) PRIMARY KEY,
    Primer_Nombre VARCHAR(50) NOT NULL,
    Segundo_Nombre VARCHAR(50),
	Tercer_Nombre VARCHAR(50),
    Primer_Apellido VARCHAR(50) NOT NULL,
    Segundo_Apellido VARCHAR(50),
    Id_Municipio INT NOT NULL,
    FOREIGN KEY (Id_Municipio) REFERENCES Municipio(Id_Municipio)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
);

CREATE TABLE Rol (
	Id_Rol INT PRIMARY KEY IDENTITY(1,1),
	Rol VARCHAR(50) NOT NULL,
);

CREATE TABLE Usuario (
	Id_Usuario INT PRIMARY KEY IDENTITY(1,1),
	Nombre_Usuario VARCHAR(50) NOT NULL,
	Contrasenia VARCHAR(60) NOT NULL,
	Id_Rol INT NOT NULL,
	FOREIGN KEY (Id_Rol) REFERENCES Rol (Id_Rol)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
);

INSERT INTO Rol (Rol) VALUES 
	('Admin'),
	('Digitador');