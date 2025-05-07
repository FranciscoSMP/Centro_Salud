const departamentoModel = require('../models/departamento');

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

exports.departamento = renderView('add/departamento');

exports.addDepartamento = guardarDatos(departamentoModel.addDepartamento, '/departamento/table');

exports.getDepartamento = async (req, res) => {
    try {
        const departamentos = await departamentoModel.getDepartamento();
        res.render('departamento_table', { departamentos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener departamentos');
    }
};