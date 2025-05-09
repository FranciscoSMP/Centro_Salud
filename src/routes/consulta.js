const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

router.get('/add', consultaController.consulta);

router.get('/table', consultaController.getConsulta);

router.post('/guardar/consulta', consultaController.addConsulta);

router.post('/actualizar/consulta', consultaController.updateConsulta);

router.get('/editar/:id', consultaController.getConsultaById);

router.post('/eliminar/:id', consultaController.deleteConsulta);

module.exports = router;

