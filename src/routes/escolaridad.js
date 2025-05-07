const express = require('express');
const router = express.Router();
const escolaridadController = require('../controllers/escolaridadController');

router.get('/add', escolaridadController.escolaridad);

router.get('/table', escolaridadController.getEscolaridad);

router.post('/guardar/escolaridad', escolaridadController.addEscolaridad);

module.exports = router;