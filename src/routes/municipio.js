const express = require('express');
const router = express.Router();
const municipioController = require('../controllers/municipioController');

router.get('/add', municipioController.municipio);

router.get('/table', municipioController.getMunicipio);

router.post('/guardar/municipio', municipioController.addMunicipio);

router.post('/actualizar/municipio', municipioController.updateMunicipio);

router.get('/editar/:id', municipioController.getMunicipioById);

router.post('/eliminar/:id', municipioController.deleteMunicipio);

module.exports = router;