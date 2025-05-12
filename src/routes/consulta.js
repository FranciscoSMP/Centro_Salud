const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
const { ensureAuthenticated } = require('../lib/auth');

router.get('/add', ensureAuthenticated, consultaController.consulta);

router.get('/table', ensureAuthenticated, consultaController.getConsulta);

router.post('/guardar', ensureAuthenticated, consultaController.addConsulta);

router.post('/actualizar', ensureAuthenticated, consultaController.updateConsulta);

router.get('/editar/:id', ensureAuthenticated, consultaController.getConsultaById);

router.post('/eliminar/:id', ensureAuthenticated, consultaController.deleteConsulta);

module.exports = router;

