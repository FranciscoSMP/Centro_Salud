const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/add', pacienteController.paciente);

router.get('/table', pacienteController.getPaciente);

router.post('/guardar/paciente', pacienteController.addPaciente);

module.exports = router;