const enfermeroModel = require('../models/enfermero');
const municipioModel = require('../models/municipio');

const guardarDatos = (model, redirect) => async (req, res) => {
    try {
        await model(req.body); 
        req.flash('success_msg', 'Datos Guardados Correctamente');
        res.redirect(redirect);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error al guardar ${redirect.slice(7)}`);
    }
};

exports.enfermero = async (req, res) => {
    try {
        const municipio = await municipioModel.getMunicipio();
        res.render('add/enfermero', { 
            title: 'Añadir Enfermero',
            municipio
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
};

exports.addEnfermero = guardarDatos(enfermeroModel.addEnfermero, '/enfermero/table');

exports.getEnfermero = async (req, res) => {
    try {
        const enfermeros = await enfermeroModel.getEnfermero();
        res.render('tables/enfermero', { 
            title: 'Enfermero',
            enfermeros 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener enfermeros');
    }
};

exports.updateEnfermero = async (req, res) => {
    try {
        await enfermeroModel.updateEnfermero(req.body);
        req.flash('success_msg', 'Datos Actualizados Correctamente');
        res.redirect('/enfermero/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar Enfermero');
    }
};

exports.getEnfermeroById = async (req, res) => {
    try {
        const enfermero = await enfermeroModel.getEnfermeroById(req.params.id);
        res.render('update/enfermero', { 
            title: 'Actualizar Enfermeros',
            enfermero 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener a Enfermero');
    }
};

exports.deleteEnfermero = async (req, res) => {
    try {
        await enfermeroModel.deleteEnfermero(req.params.id);
        req.flash('success_msg', 'Datos Eliminados Correctamente');
        res.redirect('/enfermero/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar enfermero');
    }
};