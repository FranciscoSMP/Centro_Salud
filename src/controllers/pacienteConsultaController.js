const pacienteConsultaModel = require('../models/paciente_consulta');
const pacienteModel = require('../models/paciente');
const tipo_consultaModel = require('../models/tipo_consulta');

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

exports.pacienteConsulta = async (req, res) => {
    try {
        const pacientes = await pacienteModel.getPaciente();
        const tipo_consultas = await tipo_consultaModel.getTipo_Consulta();
        res.render('add/pacienteConsulta', { 
            title: 'Añadir Paciente Consulta',
            pacientes, 
            tipo_consultas
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
};

exports.addPacienteConsulta = guardarDatos(pacienteConsultaModel.addPacienteConsulta, '/paciente_consulta/table');

exports.getPacienteConsulta = async (req, res) => {
    try {
        const pacienteConsulta = await pacienteConsultaModel.getPacienteConsulta();
        res.render('tables/pacienteConsulta', { 
            title: 'Paciente Consulta',
            pacienteConsulta 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las relaciones');
    }
};

exports.deletePacienteConsulta = async (req, res) => {
    try {
        await pacienteConsultaModel.deletePacienteConsulta(req.params.id);
        req.flash('success_msg', 'Datos Eliminados Correctamente');
        res.redirect('/paciente_consulta/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la relación paciente - consulta');
    }
};

exports.updatePacienteConsulta = async (req, res) => {
    try {
        await pacienteConsultaModel.updatePacienteConsulta(req.body);
        req.flash('success_msg', 'Datos Actualizados Correctamente');
        res.redirect('/paciente_consulta/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar Paciente-Consulta');
    }
};

exports.getPacienteConsultaById = async (req, res) => {
    try {
        const pacienteConsulta = await pacienteConsultaModel.getPacienteConsultaById(req.params.id);
        const pacientes = await pacienteModel.getPaciente();
        const tipo_consultas = await tipo_consultaModel.getConsulta();
        res.render('update/pacienteConsulta', { 
            title: 'Actualizar Paciente Consulta',
            pacienteConsulta,
            pacientes,
            tipo_consultas 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la comunidad lingüística');
    }
};