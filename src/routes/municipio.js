const express = require('express');
const router = express.Router();
const municipioController = require('../controllers/municipioController');

router.get('/table', municipioController.municipio);

router.post('/guardar/municipio', municipioController.addMunicipio);

module.exports = router;