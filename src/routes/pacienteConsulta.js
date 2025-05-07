const express = require('express');
const router = express.Router();
const pacienteConsultaController = require('../controllers/pacienteConsultaController');

router.get('/add', pacienteConsultaController.pacienteConsulta);

router.get('/table', pacienteConsultaController.getPacienteConsulta);

router.post('/guardar/paciente_consulta', pacienteConsultaController.addPacienteConsulta);

module.exports = router;