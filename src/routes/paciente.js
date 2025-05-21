const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const { ensureAuthenticated } = require('../lib/auth');

router.get('/add', ensureAuthenticated, pacienteController.paciente);

router.get('/table', ensureAuthenticated, pacienteController.getPaciente);

router.post('/guardar', ensureAuthenticated, pacienteController.addPaciente);

router.post('/actualizar', ensureAuthenticated, pacienteController.updatePaciente);

router.get('/editar/:id', ensureAuthenticated, pacienteController.getPacienteById);

router.post('/eliminar/:id', ensureAuthenticated, pacienteController.deletePaciente);

router.get('/excel', pacienteController.exportarPacientesExcel);

router.get('/pdf', pacienteController.exportarPacientesPDF);

module.exports = router;