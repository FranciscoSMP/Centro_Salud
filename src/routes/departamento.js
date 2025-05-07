const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');

router.get('/add', departamentoController.departamento);

router.get('/table', departamentoController.getDepartamento);

router.post('/guardar/departamento', departamentoController.addDepartamento);

module.exports = router;