const express = require('express');
const router = express.Router();
const enfermeroController = require('../controllers/enfermeroController');

router.get('/table', enfermeroController.enfermero);

router.post('/guardar/enfermero', enfermeroController.addEnfermero);

module.exports = router;