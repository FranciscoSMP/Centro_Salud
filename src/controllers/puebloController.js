const puebloModel = require('../models/pueblo');

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

exports.pueblo = renderView('add/pueblo');

exports.addPueblo = guardarDatos(puebloModel.addPueblo, '/pueblo/table');

exports.getPueblo = async (req, res) => {
    try {
        const pueblo = await puebloModel.getPueblo();
        res.render('pueblo_table', { pueblo });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener pueblos');
    }
};

exports.updatePueblo = async (req, res) => {
    try {
        await puebloModel.updatePueblo(req.body);
        res.redirect('/pueblo/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar pueblos');
    }
};

exports.getPuebloById = async (req, res) => {
    try {
        const pueblo = await puebloModel.getPuebloById(req.params.id);
        res.render('pueblo_update', { pueblo });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener pueblos');
    }
};

exports.deletePueblo = async (req, res) => {
    try {
        await puebloModel.deletePueblo(req.params.id);
        res.redirect('/pueblo/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el pueblo');
    }
};