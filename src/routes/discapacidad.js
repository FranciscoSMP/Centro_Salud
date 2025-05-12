const express = require('express');
const router = express.Router();
const discapacidadController = require('../controllers/discapacidadController');
const { ensureAuthenticated } = require('../lib/auth');

router.get('/add', ensureAuthenticated, discapacidadController.discapacidad);

router.get('/table', ensureAuthenticated, discapacidadController.getDiscapacidad);

router.post('/guardar', ensureAuthenticated, discapacidadController.addDiscapacidad);

router.post('/actualizar', ensureAuthenticated, discapacidadController.updateDiscapacidad);

router.get('/editar/:id', ensureAuthenticated, discapacidadController.getDiscapacidadById);

router.post('/eliminar/:id', ensureAuthenticated, discapacidadController.deleteDiscapacidad);

module.exports = router;
