const express = require('express');
const router = express.Router();
const escolaridadController = require('../controllers/escolaridadController');

router.get('/table', escolaridadController.escolaridad);

router.post('/guardar/escolaridad', escolaridadController.addEscolaridad);

module.exports = router;