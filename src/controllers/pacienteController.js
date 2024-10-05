const pacienteModel = require('../models/paciente');
const escolaridadModel = require('../models/escolaridad');
const comunidadModel = require('../models/comunidad_linguistica');
const profesionModel = require('../models/profesion');
const discapacidadModel = require('../models/discapacidad');
const controlModel = require('../models/control');
const puebloModel = require('../models/pueblo');
const municipioModel = require('../models/municipio');
const departamentoModel = require('../models/departamento');
const { format } = require('date-fns');

const renderView = (view) => (req, res) => {
    res.render(view, {
        title: 'Añadir Paciente'
    });
};

const guardarDatos = (model, redirect) => async (req, res) => {
    try {
        await model(req.body); 
        res.redirect(redirect);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error al guardar ${redirect.slice(7)}`);
    }
};

exports.paciente = async (req, res) => {
    try {
        const escolaridades = await escolaridadModel.getEscolaridad();
        const comunidades = await comunidadModel.getComunidad_Linguistica();
        const profesiones = await profesionModel.getProfesion();
        const discapacidades = await discapacidadModel.getDiscapacidad();
        const controles = await controlModel.getControl();
        const pueblos = await puebloModel.getPueblo();
        const municipios = await municipioModel.getMunicipio();
        const departamentos = await departamentoModel.getDepartamento();
        
        res.render('add/paciente', {escolaridades, comunidades, profesiones, discapacidades, controles, pueblos, municipios, departamentos});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
};

exports.addPaciente = guardarDatos(pacienteModel.addPaciente, '/paciente/table');

exports.getPaciente = async (req, res) => {
    try {
        const pacientes = await pacienteModel.getPaciente();
        const pacientesFormateados = pacientes.map(paciente => {
            return {
                ...paciente,
                Fecha_nacimiento: format(new Date(paciente.Fecha_nacimiento), 'dd/MM/yyyy')
            };
        });
        res.render('tables/paciente', { 
            title: 'Paciente',
            pacientes: pacientesFormateados 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener pacientes');
    }
};

exports.updatePaciente = async (req, res) => {
    try {
        await pacienteModel.updatePaciente(req.body);
        res.redirect('/paciente/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el paciente');
    }
};

exports.getPacienteById = async (req, res) => {
    try {
        const paciente = await pacienteModel.getPacienteById(req.params.id);
        const formattedPaciente = {
            ...paciente,
            Fecha_nacimiento: format(new Date(paciente.Fecha_nacimiento), 'yyyy-MM-dd')
        };
        res.render('update/paciente', { 
            title: 'Actualizar Paciente',
            paciente: formattedPaciente 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el paciente');
    }
};

exports.deletePaciente = async (req, res) => {
    try {
        await pacienteModel.deletePaciente(req.params.id);
        res.redirect('/paciente/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el paciente');
    }
};