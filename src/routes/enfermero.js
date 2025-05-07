const express = require('express');
const router = express.Router();
const enfermeroController = require('../controllers/enfermeroController');

router.get('/add', enfermeroController.enfermero);

router.get('/table', enfermeroController.getEnfermero);

router.post('/guardar/enfermero', enfermeroController.addEnfermero);

module.exports = router;