const express = require('express');
const router = express.Router();
const pacienteConsultaController = require('../controllers/pacienteConsultaController');

router.get('/table', pacienteConsultaController.pacienteConsulta);

router.post('/guardar/paciente_consulta', pacienteConsultaController.addPacienteConsulta);

module.exports = router;