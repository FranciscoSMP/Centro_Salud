const pacienteModel = require('../models/paciente');
const escolaridadModel = require('../models/escolaridad');
const comunidadModel = require('../models/comunidad_linguistica');
const profesionModel = require('../models/profesion');
const discapacidadModel = require('../models/discapacidad');
const puebloModel = require('../models/pueblo');
const municipioModel = require('../models/municipio');
const departamentoModel = require('../models/departamento');
const { format } = require('date-fns');


const guardarDatos = (model, redirect) => async (req, res) => {
    try {
        await model(req.body); 
        req.flash('success_msg', 'Datos Guardados Correctamente');
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
        const pueblos = await puebloModel.getPueblo();
        const municipios = await municipioModel.getMunicipio();
        const departamentos = await departamentoModel.getDepartamento();
        
        res.render('add/paciente', {
            title: 'Añadir Paciente',
            escolaridades, comunidades, profesiones, discapacidades, pueblos, municipios, departamentos
        });
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
        req.flash('success_msg', 'Datos Actualizados Correctamente');
        res.redirect('/paciente/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el paciente');
    }
};

exports.getPacienteById = async (req, res) => {
    try {
        const paciente = await pacienteModel.getPacienteById(req.params.id);
        const escolaridades = await escolaridadModel.getEscolaridad();
        const comunidades = await comunidadModel.getComunidad_Linguistica();
        const profesiones = await profesionModel.getProfesion();
        const discapacidades = await discapacidadModel.getDiscapacidad();
        const pueblos = await puebloModel.getPueblo();
        const municipios = await municipioModel.getMunicipio();
        const departamentos = await departamentoModel.getDepartamento();
        
        const formattedPaciente = {
            ...paciente,
            Fecha_nacimiento: format(new Date(paciente.Fecha_nacimiento), 'yyyy-MM-dd')
        };
        res.render('update/paciente', { 
            title: 'Actualizar Paciente',
            paciente: formattedPaciente,
            escolaridades,
            comunidades,
            profesiones,
            discapacidades,
            pueblos,
            municipios,
            departamentos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el paciente');
    }
};

exports.deletePaciente = async (req, res) => {
    try {
        await pacienteModel.deletePaciente(req.params.id);
        req.flash('success_msg', 'Datos Eliminados Correctamente');
        res.redirect('/paciente/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el paciente');
    }
};