const express = require('express');
const router = express.Router();
const pacienteConsultaController = require('../controllers/pacienteConsultaController');

router.get('/add', pacienteConsultaController.pacienteConsulta);

router.get('/table', pacienteConsultaController.getPacienteConsulta);

router.post('/guardar', pacienteConsultaController.addPacienteConsulta);

router.post('/actualizar', pacienteConsultaController.updatePacienteConsulta);

router.get('/editar/:id', pacienteConsultaController.getPacienteConsultaById);

router.post('/eliminar/:id', pacienteConsultaController.deletePacienteConsulta);

module.exports = router;