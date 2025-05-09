const express = require('express');
const router = express.Router();
const pacienteConsultaController = require('../controllers/pacienteConsultaController');

router.get('/add', pacienteConsultaController.pacienteConsulta);

router.get('/table', pacienteConsultaController.getPacienteConsulta);

router.post('/guardar/paciente_consulta', pacienteConsultaController.addPacienteConsulta);

router.post('/actualizar/paciente_consulta', pacienteConsultaController.updatePacienteConsulta);

router.get('/editar/:id', pacienteConsultaController.getPacienteConsultaById);

router.post('/eliminar/:id', pacienteConsultaController.deletePacienteConsulta);

module.exports = router;