const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');

router.get('/table', departamentoController.departamento);

router.post('/guardar/departamento', departamentoController.addDepartamento);

module.exports = router;