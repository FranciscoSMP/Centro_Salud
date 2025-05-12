const controlModel = require('../models/control');

const renderView = (view) => (req, res) => {
    res.render(view, {
        title: 'Añadir Control'
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

exports.control = renderView('add/control');

exports.addControl = guardarDatos(controlModel.addControl, '/control/table');

exports.getControl = async (req, res) => {
    try {
        const control = await controlModel.getControl();
        res.render('tables/control', { 
            title: 'Controles',
            control 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los controles');
    }
};

exports.updateControl = async (req, res) => {
    try {
        await controlModel.updateControl(req.body);
        req.flash('success_msg', 'Datos Actualizados Correctamente');
        res.redirect('/control/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el control');
    }
};

exports.getControlById = async (req, res) => {
    try {
        const control = await controlModel.getControlById(req.params.id);
        res.render('update/control', { 
            title: 'Actualizar Control',
            control 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el control');
    }
};

exports.deleteControl = async (req, res) => {
    try {
        await controlModel.deleteControl(req.params.id);
        req.flash('success_msg', 'Datos Eliminados Correctamente');
        res.redirect('/control/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el control');
    }
};