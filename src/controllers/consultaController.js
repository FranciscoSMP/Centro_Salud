const consultaModel = require('../models/consulta');
const pacienteModel = require('../models/paciente');
const { format } = require('date-fns');

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

exports.consulta = async (req, res) => {
    try {
        const pacientes = await pacienteModel.getPaciente();
        res.render('add/consulta', { 
            title: 'Añadir Consulta',
            pacientes
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
};

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
        res.render('tables/consulta', { 
            title: 'Consulta',
            consultas: consultasFormateadas 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener consultas');
    }
};

exports.updateConsulta = async (req, res) => {
    try {
        await consultaModel.updateConsulta(req.body);
        req.flash('success_msg', 'Datos Actualizados Correctamente');
        res.redirect('/consulta/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la consulta');
    }
};

exports.getConsultaById = async (req, res) => {
    try {
        const consulta = await consultaModel.getConsultaById(req.params.id);
        const pacientes = await pacienteModel.getPaciente();
        const formattedConsulta = {
            ...consulta,
            Fecha_Consulta: format(new Date(consulta.Fecha_Consulta), 'yyyy-MM-dd')
        };
        res.render('update/consulta', { 
            title: 'Actualizar Consulta',
            consulta: formattedConsulta,
            pacientes
         });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la consulta');
    }
};

exports.deleteConsulta = async (req, res) => {
    try {
        await consultaModel.deleteConsulta(req.params.id);
        req.flash('success_msg', 'Datos Eliminados Correctamente');
        res.redirect('/consulta/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la consulta');
    }
};
