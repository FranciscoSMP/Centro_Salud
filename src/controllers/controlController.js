const controlModel = require('../models/control');

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

exports.control = renderView('control');

exports.addControl = guardarDatos(controlModel.addControl, '/control/table');

exports.getControl = async (req, res) => {
    try {
        const control = await controlModel.getControl();
        res.render('control_table', { control });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los controles');
    }
};