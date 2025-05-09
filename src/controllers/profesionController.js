const profesionModel = require('../models/profesion');

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

exports.profesion = renderView('add/profesion');

exports.addProfesion = guardarDatos(profesionModel.addProfesion, '/profesion/table');

exports.getProfesion = async (req, res) => {
    try {
        const profesion = await profesionModel.getProfesion();
        res.render('profesion_table', { profesion });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener profesiones');
    }
};

exports.updateProfesion = async (req, res) => {
    try {
        await profesionModel.updateProfesion(req.body);
        res.redirect('/profesion/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la profesion');
    }
};

exports.getProfesionById = async (req, res) => {
    try {
        const profesion = await profesionModel.getProfesionById(req.params.id);
        res.render('profesion_update', { profesion });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la profesion');
    }
};

exports.deleteProfesion = async (req, res) => {
    try {
        await profesionModel.deleteProfesion(req.params.id);
        res.redirect('/profesion/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar profesion');
    }
};