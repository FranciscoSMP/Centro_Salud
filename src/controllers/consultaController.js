const consultaModel = require('../models/consulta');
const { format } = require('date-fns');

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

exports.consulta = renderView('consulta');

exports.addConsulta = guardarDatos(consultaModel.addConsulta, '/consulta/table');

exports.getConsulta = async (req, res) => {
    try {
        const consultas = await consultaModel.getConsulta();
        const consultasFormateadas = consultas.map(consulta => {
            return {
                ...consulta,
                Fecha_Consulta: format(new Date(consulta.Fecha_Consulta), 'dd/MM/yyyy')
            };
        });
        res.render('consulta_table', { consultas: consultasFormateadas });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener consultas');
    }
};