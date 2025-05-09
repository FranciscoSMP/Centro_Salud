const pacienteModel = require('../models/paciente');
const { format } = require('date-fns');

const renderView = (view) => (req, res) => {
    res.render(view);
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

exports.paciente = renderView('add/paciente');

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
        res.render('paciente_table', { pacientes: pacientesFormateados });
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
        res.render('paciente_update', { paciente: formattedPaciente });
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