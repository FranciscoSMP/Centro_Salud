const profesionModel = require('../models/profesion');

const renderView = (view) => (req, res) => {
    res.render(view,{
        title: 'Añadir Profesion'
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

exports.profesion = renderView('add/profesion');

exports.addProfesion = guardarDatos(profesionModel.addProfesion, '/profesion/table');

exports.getProfesion = async (req, res) => {
    try {
        const profesion = await profesionModel.getProfesion();
        res.render('tables/profesion', { 
            title: 'Profesiones',
            profesion 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener profesiones');
    }
};

exports.updateProfesion = async (req, res) => {
    try {
        await profesionModel.updateProfesion(req.body);
        req.flash('success_msg', 'Datos Actualizados Correctamente');
        res.redirect('/profesion/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la profesion');
    }
};

exports.getProfesionById = async (req, res) => {
    try {
        const profesion = await profesionModel.getProfesionById(req.params.id);
        res.render('update/profesion', { 
            title: 'Actualizar Profesion',
            profesion 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la profesion');
    }
};

exports.deleteProfesion = async (req, res) => {
    try {
        await profesionModel.deleteProfesion(req.params.id);
        req.flash('success_msg', 'Datos Eliminados Correctamente');
        res.redirect('/profesion/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar profesion');
    }
};