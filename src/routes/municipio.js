const express = require('express');
const router = express.Router();
const municipioController = require('../controllers/municipioController');
const { ensureAuthenticated } = require('../lib/auth');

router.get('/add', ensureAuthenticated, municipioController.municipio);

router.get('/table', ensureAuthenticated, municipioController.getMunicipio);

router.post('/guardar', ensureAuthenticated, municipioController.addMunicipio);

router.post('/actualizar', ensureAuthenticated, municipioController.updateMunicipio);

router.get('/editar/:id', ensureAuthenticated, municipioController.getMunicipioById);

router.post('/eliminar/:id', ensureAuthenticated, municipioController.deleteMunicipio);

module.exports = router;