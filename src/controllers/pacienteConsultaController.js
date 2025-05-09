const pacienteConsultaModel = require('../models/paciente_consulta');

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

exports.pacienteConsulta = renderView('add/pacienteConsulta');

exports.addPacienteConsulta = guardarDatos(pacienteConsultaModel.addPacienteConsulta, '/paciente_consulta/table');

exports.getPacienteConsulta = async (req, res) => {
    try {
        const pacienteConsulta = await pacienteConsultaModel.getPacienteConsulta();
        res.render('pacienteConsulta_table', { pacienteConsulta });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las relaciones');
    }
};

exports.deletePacienteConsulta = async (req, res) => {
    try {
        await pacienteConsultaModel.deletePacienteConsulta(req.params.id);
        res.redirect('/paciente_consulta/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la relación paciente - consulta');
    }
};

exports.updatePacienteConsulta = async (req, res) => {
    try {
        await pacienteConsultaModel.updatePacienteConsulta(req.body);
        res.redirect('/paciente_consulta/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar Paciente-Consulta');
    }
};

exports.getPacienteConsultaById = async (req, res) => {
    try {
        const pacienteConsulta = await pacienteConsultaModel.getPacienteConsultaById(req.params.id);
        res.render('pacienteConsulta_update', { pacienteConsulta });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la comunidad lingüística');
    }
};