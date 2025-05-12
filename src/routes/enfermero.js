const express = require('express');
const router = express.Router();
const enfermeroController = require('../controllers/enfermeroController');
const { ensureAuthenticated } = require('../lib/auth');

router.get('/add', ensureAuthenticated, enfermeroController.enfermero);

router.get('/table', ensureAuthenticated, enfermeroController.getEnfermero);

router.post('/guardar', ensureAuthenticated, enfermeroController.addEnfermero);

router.post('/eliminar/:id', ensureAuthenticated, enfermeroController.deleteEnfermero);

router.post('/actualizar', ensureAuthenticated, enfermeroController.updateEnfermero);

router.get('/editar/:id', ensureAuthenticated, enfermeroController.getEnfermeroById);

module.exports = router;