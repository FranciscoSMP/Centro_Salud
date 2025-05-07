const discapacidadModel = require('../models/discapacidad');

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

exports.discapacidad = renderView('discapacidad');

exports.addDiscapacidad = guardarDatos(discapacidadModel.addDiscapacidad, '/discapacidad/table');

exports.getDiscapacidad = async (req, res) => {
    try {
        const discapacidad = await discapacidadModel.getDiscapacidad();
        res.render('discapacidad_table', { discapacidad });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener discapacidades');
    }
};