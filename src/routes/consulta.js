const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

router.get('/add', consultaController.consulta);

router.get('/table', consultaController.getConsulta);

router.post('/guardar/consulta', consultaController.addConsulta);

module.exports = router;

