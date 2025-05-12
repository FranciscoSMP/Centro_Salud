const escolaridadModel = require('../models/escolaridad');

const renderView = (view) => (req, res) => {
    res.render(view, {
        title: 'Añadir Escolaridad'
    });
};

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

exports.escolaridad = renderView('add/escolaridad');

exports.addEscolaridad = guardarDatos(escolaridadModel.addEscolaridad, '/escolaridad/table');

exports.getEscolaridad = async (req, res) => {
    try {
        const escolaridad = await escolaridadModel.getEscolaridad();
        res.render('tables/escolaridad', { 
            title: 'Escolaridad',
            escolaridad 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener Escolaridades');
    }
};

exports.updateEscolaridad = async (req, res) => {
    try {
        await escolaridadModel.updateEscolaridad(req.body);
        req.flash('success_msg', 'Datos Actualizados Correctamente');
        res.redirect('/escolaridad/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la escolaridad');
    }
};

exports.getEscolaridadById = async (req, res) => {
    try {
        const escolaridad = await escolaridadModel.getEscolaridadById(req.params.id);
        res.render('update/escolaridad', { 
            title: 'Actualizar Escolaridad',
            escolaridad 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la escolaridad');
    }
};

exports.deleteEscolaridad = async (req, res) => {
    try {
        await escolaridadModel.deleteEscolaridad(req.params.id);
        req.flash('success_msg', 'Datos Eliminados Correctamente');
        res.redirect('/escolaridad/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la escolaridad');
    }
};