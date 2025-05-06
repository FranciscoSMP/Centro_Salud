const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/table', pacienteController.paciente);

router.post('/guardar/paciente', pacienteController.addPaciente);

module.exports = router;