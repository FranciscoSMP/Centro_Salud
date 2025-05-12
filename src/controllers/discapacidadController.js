const discapacidadModel = require('../models/discapacidad');

const renderView = (view) => (req, res) => {
    res.render(view, {
        title: 'Añadir Discapacidad'
    });
}

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

exports.discapacidad = renderView('add/discapacidad');

exports.addDiscapacidad = guardarDatos(discapacidadModel.addDiscapacidad, '/discapacidad/table');

exports.getDiscapacidad = async (req, res) => {
    try {
        const discapacidad = await discapacidadModel.getDiscapacidad();
        res.render('tables/discapacidad', { 
            title: 'Discapacidades',
            discapacidad 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener discapacidades');
    }
};

exports.updateDiscapacidad = async (req, res) => {
    try {
        await discapacidadModel.updateDiscapcidad(req.body);
        req.flash('success_msg', 'Datos Actualizados Correctamente'); 
        res.redirect('/discapacidad/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la discapacidad');
    }
};

exports.getDiscapacidadById = async (req, res) => {
    try {
        const discapacidad = await discapacidadModel.getDiscapacidadById(req.params.id);
        res.render('update/discapacidad', { 
            title: 'Actualizar Discapacidad',
            discapacidad 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la discapacidad');
    }
};

exports.deleteDiscapacidad = async (req, res) => {
    try {
        await discapacidadModel.deleteDiscapacidad(req.params.id);
        req.flash('success_msg', 'Datos Eliminados Correctamente'); 
        res.redirect('/discapacidad/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la discapacidad');
    }
};