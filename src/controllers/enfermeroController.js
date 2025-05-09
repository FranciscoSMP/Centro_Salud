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

exports.enfermero = renderView('add/enfermero');

exports.addEnfermero = guardarDatos(enfermeroModel.addEnfermero, '/enfermero/table');

exports.getEnfermero = async (req, res) => {
    try {
        const enfermeros = await enfermeroModel.getEnfermero();
        res.render('enfermero_table', { enfermeros });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener enfermeros');
    }
};

exports.updateEnfermero = async (req, res) => {
    try {
        await enfermeroModel.updateEnfermero(req.body);
        res.redirect('/enfermero/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar Enfermero');
    }
};

exports.getEnfermeroById = async (req, res) => {
    try {
        const enfermero = await enfermeroModel.getEnfermeroById(req.params.id);
        res.render('enfermero_update', { enfermero });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener a Enfermero');
    }
};

exports.deleteEnfermero = async (req, res) => {
    try {
        await enfermeroModel.deleteEnfermero(req.params.id);
        res.redirect('/enfermero/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar enfermero');
    }
};