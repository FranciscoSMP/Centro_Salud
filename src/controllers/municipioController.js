const municipioModel = require('../models/municipio');

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

exports.municipio = renderView('municipio');

exports.addMunicipio = guardarDatos(municipioModel.addMunicipio, '/municipio/table');