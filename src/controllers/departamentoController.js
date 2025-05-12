const departamentoModel = require('../models/departamento');

const renderView = (view) => (req, res) => {
    res.render(view, {
        title: 'Añadir Departamento'
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

exports.departamento = renderView('add/departamento');

exports.addDepartamento = guardarDatos(departamentoModel.addDepartamento, '/departamento/table');

exports.getDepartamento = async (req, res) => {
    try {
        const departamentos = await departamentoModel.getDepartamento();
        res.render('tables/departamento', { 
            title: 'Departamentos',
            departamentos 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener departamentos');
    }
};

exports.updateDepartamento = async (req, res) => {
    try {
        await departamentoModel.updateDepartamento(req.body);
        req.flash('success_msg', 'Datos Actualizados Correctamente');
        res.redirect('/departamento/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el departamento');
    }
};

exports.getDepartamentoById = async (req, res) => {
    try {
        const departamento = await departamentoModel.getDepartamentoById(req.params.id);
        res.render('update/departamento', { 
            title: 'Actualizar Departamento',
            departamento 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el departamento');
    }
};

exports.deleteDepartamento = async (req, res) => {
    try {
        await departamentoModel.deleteDepartamento(req.params.id);
        req.flash('success_msg', 'Datos Eliminados Correctamente');
        res.redirect('/departamento/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el departamento');
    }
};