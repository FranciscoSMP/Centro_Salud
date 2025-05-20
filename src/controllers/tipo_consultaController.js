const tipo_consultaModel = require('../models/tipo_consulta');
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

exports.tipo_consulta = async (req, res) => {
    try {
        const pacientes = await pacienteModel.getPaciente();
        res.render('add/tipo_consulta', { 
            title: 'Añadir Tipo de Consulta',
            pacientes
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos');
    }
};

exports.addTipo_Consulta = guardarDatos(tipo_consultaModel.addTipo_Consulta, '/tipo_consulta/table');

exports.getTipo_Consulta = async (req, res) => {
    try {
        const tipo_consultas = await tipo_consultaModel.getTipo_Consulta();
        const consultasFormateadas = tipo_consultas.map(tipo_consultas => {
            return {
                ...tipo_consultas,
                Fecha_Consulta: format(new Date(tipo_consultas.Fecha_Consulta), 'dd/MM/yyyy')
            };
        });
        res.render('tables/tipo_consulta', { 
            title: 'Comunidades Lingüisticas',
            tipo_consultas: consultasFormateadas 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener tipo de consultas');
    }
};

exports.updateTipo_Consulta = async (req, res) => {
    try {
        await tipo_consultaModel.updateTipo_Consulta(req.body);
        req.flash('success_msg', 'Datos Actualizados Correctamente');
        res.redirect('/tipo_consulta/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el tipo de consulta');
    }
};

exports.getTipo_ConsultaById = async (req, res) => {
    try {
        const tipo_consulta = await tipo_consultaModel.getTipo_ConsultaById(req.params.id);
        const pacientes = await pacienteModel.getPaciente();
        const formattedConsulta = {
            ...tipo_consulta,
            Fecha_Consulta: format(new Date(tipo_consulta.Fecha_Consulta), 'yyyy-MM-dd')
        };
        res.render('update/tipo_consulta', { 
            title: 'Actualizar Tipo de Consulta',
            tipo_consulta: formattedConsulta,
            pacientes
         });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el tipo de consulta');
    }
};

exports.deleteTipo_Consulta = async (req, res) => {
    try {
        await tipo_consultaModel.deleteTipo_Consulta(req.params.id);
        req.flash('success_msg', 'Datos Eliminados Correctamente');
        res.redirect('/tipo_consulta/table');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el tipo de consulta');
    }
};
