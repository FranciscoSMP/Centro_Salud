const express = require('express');
const router = express.Router();
const enfermeroController = require('../controllers/enfermeroController');

router.get('/add', enfermeroController.enfermero);

router.get('/table', enfermeroController.getEnfermero);

router.post('/guardar/enfermero', enfermeroController.addEnfermero);

router.post('/eliminar/:id', enfermeroController.deleteEnfermero);

router.post('/actualizar/enfermero', enfermeroController.updateEnfermero);

router.get('/editar/:id', enfermeroController.getEnfermeroById);

module.exports = router;