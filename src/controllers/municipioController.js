const municipioModel = require('../models/municipio');
const departamentoModel = require('../models/departamento');

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

exports.municipio = async (req, res) => {
    try {
        const departamentos = await departamentoModel.getDepartamento();
        res.render('add/municipio', { 
            title: 'Añadir Municipio',
            departamentos
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
};

exports.addMunicipio = guardarDatos(municipioModel.addMunicipio, '/municipio/table');

exports.getMunicipio = async (req, res) => {
    try {
        const municipio = await municipioModel.getMunicipioWithDepartamento();
        res.render('tables/municipio', { 
            title: 'Municipios',
            municipio 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
};

exports.updateMunicipio = async (req, res) => {
    try {
        await municipioModel.updateMunicipio(req.body);
        req.flash('success_msg', 'Datos Actualizados Correctamente');
        res.redirect('/municipio/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el municipio');
    }
};

exports.getMunicipioById = async (req, res) => {
    try {
        const municipio = await municipioModel.getMunicipioById(req.params.id);
        const departamentos = await departamentoModel.getDepartamento();
        res.render('update/municipio', { 
            title: 'Actualizar Municipio',
            municipio,
            departamentos
         });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el municipio');
    }
};

exports.deleteMunicipio = async (req, res) => {
    try {
        await municipioModel.deleteMunicipio(req.params.id);
        req.flash('success_msg', 'Datos Eliminados Correctamente');
        res.redirect('/municipio/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el municipio');
    }
};
