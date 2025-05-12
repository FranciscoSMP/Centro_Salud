const express = require('express');
const router = express.Router();
const puebloController = require('../controllers/puebloController');
const { ensureAuthenticated } = require('../lib/auth');

router.get('/add', ensureAuthenticated, puebloController.pueblo);

router.get('/table', ensureAuthenticated, puebloController.getPueblo);

router.post('/guardar', ensureAuthenticated, puebloController.addPueblo);

router.post('/actualizar', ensureAuthenticated, puebloController.updatePueblo);

router.get('/editar/:id', ensureAuthenticated, puebloController.getPuebloById);

router.post('/eliminar/:id', ensureAuthenticated, puebloController.deletePueblo);

module.exports = router;