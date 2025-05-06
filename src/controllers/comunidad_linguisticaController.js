const comunidad_linguisticaModel = require('../models/comunidad_linguistica');

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

exports.comunidad_linguistica = renderView('comunidad_linguistica');

exports.addComunidad_Linguistica = guardarDatos(comunidad_linguisticaModel.addComunidad_Linguistica, '/comunidad_linguistica/table');