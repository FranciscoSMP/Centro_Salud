const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

router.get('/table', consultaController.consulta);

router.post('/guardar/consulta', consultaController.addConsulta);

module.exports = router;

