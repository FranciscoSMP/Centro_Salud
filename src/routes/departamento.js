const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');
const { ensureAuthenticated } = require('../lib/auth');

router.get('/add', ensureAuthenticated, departamentoController.departamento);

router.get('/table', ensureAuthenticated, departamentoController.getDepartamento);

router.post('/guardar', ensureAuthenticated, departamentoController.addDepartamento);

router.post('/actualizar', ensureAuthenticated, departamentoController.updateDepartamento);

router.get('/editar/:id', ensureAuthenticated, departamentoController.getDepartamentoById);

router.post('/eliminar/:id', ensureAuthenticated, departamentoController.deleteDepartamento);

module.exports = router;