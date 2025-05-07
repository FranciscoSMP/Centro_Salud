const comunidad_linguisticaModel = require('../models/comunidad_linguistica');

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

exports.comunidad_linguistica = renderView('comunidad_linguistica');

exports.addComunidad_Linguistica = guardarDatos(comunidad_linguisticaModel.addComunidad_Linguistica, '/comunidad_linguistica/table');

exports.getComunidad_Linguistica = async (req, res) => {
    try {
        const comunidades = await comunidad_linguisticaModel.getComunidad_Linguistica();
        res.render('comunidad_linguistica_table', { comunidades });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener comunidades lingüísticas');
    }
};

exports.updateComunidad_Linguistica = async (req, res) => {
    try {
        await comunidad_linguisticaModel.updateComunidad_Linguistica(req.body);
        res.redirect('/comunidad_linguistica/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la comunidad lingüística');
    }
};

exports.getComunidadById = async (req, res) => {
    try {
        const comunidad = await comunidad_linguisticaModel.getComunidadById(req.params.id);
        res.render('comunidad_linguistica_update', { comunidad });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la comunidad lingüística');
    }
};