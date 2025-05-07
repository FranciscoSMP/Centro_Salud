const express = require('express');
const router = express.Router();
const comunidad_linguisticaController = require('../controllers/comunidad_linguisticaController');

router.get('/add', comunidad_linguisticaController.comunidad_linguistica);

router.get('/table', comunidad_linguisticaController.getComunidad_Linguistica);

router.post('/guardar/comunidad_linguistica', comunidad_linguisticaController.addComunidad_Linguistica);

router.post('/actualizar/comunidad_linguistica', comunidad_linguisticaController.updateComunidad_Linguistica);

router.get('/editar/:id', comunidad_linguisticaController.getComunidadById);

module.exports = router;