const express = require('express');
const router = express.Router();
const escolaridadController = require('../controllers/escolaridadController');
const { ensureAuthenticated } = require('../lib/auth');

router.get('/add', ensureAuthenticated, escolaridadController.escolaridad);

router.get('/table', ensureAuthenticated, escolaridadController.getEscolaridad);

router.post('/guardar', ensureAuthenticated, escolaridadController.addEscolaridad);

router.post('/actualizar', ensureAuthenticated, escolaridadController.updateEscolaridad);

router.get('/editar/:id', ensureAuthenticated, escolaridadController.getEscolaridadById);

router.post('/eliminar/:id', ensureAuthenticated, escolaridadController.deleteEscolaridad);

module.exports = router;