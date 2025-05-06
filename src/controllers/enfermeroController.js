const enfermeroModel = require('../models/enfermero');

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

exports.enfermero = renderView('enfermero');

exports.addEnfermero = guardarDatos(enfermeroModel.addEnfermero, '/enfermero/table');