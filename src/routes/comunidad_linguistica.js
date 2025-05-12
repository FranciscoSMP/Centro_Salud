const express = require('express');
const router = express.Router();
const comunidad_linguisticaController = require('../controllers/comunidad_linguisticaController');
const { ensureAuthenticated } = require('../lib/auth');

router.get('/add', ensureAuthenticated, comunidad_linguisticaController.comunidad_linguistica);

router.get('/table', ensureAuthenticated, comunidad_linguisticaController.getComunidad_Linguistica);

router.post('/guardar', ensureAuthenticated, comunidad_linguisticaController.addComunidad_Linguistica);

router.post('/actualizar', ensureAuthenticated, comunidad_linguisticaController.updateComunidad_Linguistica);

router.get('/editar/:id', ensureAuthenticated, comunidad_linguisticaController.getComunidadById);

router.post('/eliminar/:id', ensureAuthenticated, comunidad_linguisticaController.deleteComunidad_Linguistica);

module.exports = router;