const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/add', pacienteController.paciente);

router.get('/table', pacienteController.getPaciente);

router.post('/guardar/paciente', pacienteController.addPaciente);

router.post('/actualizar/paciente', pacienteController.updatePaciente);

router.get('/editar/:id', pacienteController.getPacienteById);

router.post('/eliminar/:id', pacienteController.deletePaciente);

module.exports = router;