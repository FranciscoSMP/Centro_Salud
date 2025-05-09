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

exports.consulta = renderView('add/consulta');

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

exports.updateConsulta = async (req, res) => {
    try {
        await consultaModel.updateConsulta(req.body);
        res.redirect('/consulta/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la consulta');
    }
};

exports.getConsultaById = async (req, res) => {
    try {
        const consulta = await consultaModel.getConsultaById(req.params.id);
        const formattedConsulta = {
            ...consulta,
            Fecha_Consulta: format(new Date(consulta.Fecha_Consulta), 'yyyy-MM-dd')
        };
        res.render('consulta_update', { consulta: formattedConsulta });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la consulta');
    }
};

exports.deleteConsulta = async (req, res) => {
    try {
        await consultaModel.deleteConsulta(req.params.id);
        res.redirect('/consulta/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la consulta');
    }
};
