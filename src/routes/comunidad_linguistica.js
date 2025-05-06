const express = require('express');
const router = express.Router();
const comunidad_linguisticaController = require('../controllers/comunidad_linguisticaController');

router.get('/table', comunidad_linguisticaController.comunidad_linguistica);

router.post('/guardar/comunidad_linguistica', comunidad_linguisticaController.addComunidad_Linguistica);

module.exports = router;