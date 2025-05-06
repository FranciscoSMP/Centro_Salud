const express = require('express');
const router = express.Router();
const discapacidadController = require('../controllers/discapacidadController');

router.get('/table', discapacidadController.discapacidad);

router.post('/guardar/discapacidad', discapacidadController.addDiscapacidad);

module.exports = router;