const municipioModel = require('../models/municipio');

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

exports.municipio = renderView('add/municipio');

exports.addMunicipio = guardarDatos(municipioModel.addMunicipio, '/municipio/table');

exports.getMunicipio = async (req, res) => {
    try {
        const municipio = await municipioModel.getMunicipio();
        res.render('municipio_table', { municipio });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las relaciones');
    }
};

exports.updateMunicipio = async (req, res) => {
    try {
        await municipioModel.updateMunicipio(req.body);
        res.redirect('/municipio/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la comunidad lingüística');
    }
};

exports.getMunicipioById = async (req, res) => {
    try {
        const municipio = await municipioModel.getMunicipioById(req.params.id);
        res.render('municipio_update', { municipio });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la comunidad lingüística');
    }
};