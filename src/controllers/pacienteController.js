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

exports.paciente = renderView('paciente');

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