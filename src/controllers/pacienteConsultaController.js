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

exports.pacienteConsulta = renderView('pacienteConsulta');

exports.addPacienteConsulta = guardarDatos(pacienteConsultaModel.addPacienteConsulta, '/paciente_consulta/table');