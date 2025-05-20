const express = require('express');
const router = express.Router();
const pacienteConsultaController = require('../controllers/pacienteConsultaController');
const { ensureAuthenticated } = require('../lib/auth');

router.get('/add', ensureAuthenticated, pacienteConsultaController.pacienteConsulta);

router.get('/table', ensureAuthenticated, pacienteConsultaController.getPacienteConsulta);

router.post('/guardar', ensureAuthenticated, pacienteConsultaController.addPacienteConsulta);

router.post('/actualizar', ensureAuthenticated, pacienteConsultaController.updatePacienteConsulta);

router.get('/editar/:id', ensureAuthenticated, pacienteConsultaController.getPacienteConsultaById);

router.post('/eliminar/:id', ensureAuthenticated, pacienteConsultaController.deletePacienteConsulta);

module.exports = router;