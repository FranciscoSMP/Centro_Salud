const escolaridadModel = require('../models/escolaridad');

const renderView = (view) => (req, res) => {
    res.render(view);
}

const guardarDatos = (model, redirect) => async (req, res) => {
    try {
        await model(req.body); 
        res.redirect(redirect);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error al guardar ${redirect.slice(7)}`);
    }
};

exports.escolaridad = renderView('escolaridad');

exports.addEscolaridad = guardarDatos(escolaridadModel.addEscolaridad, '/escolaridad/table');