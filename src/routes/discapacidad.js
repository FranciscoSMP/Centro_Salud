const express = require('express');
const router = express.Router();
const discapacidadController = require('../controllers/discapacidadController');

router.get('/add', discapacidadController.discapacidad);

router.get('/table', discapacidadController.getDiscapacidad);

router.post('/guardar/discapacidad', discapacidadController.addDiscapacidad);

module.exports = router;