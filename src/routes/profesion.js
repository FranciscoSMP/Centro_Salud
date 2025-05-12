const express = require('express');
const router = express.Router();
const profesionController = require('../controllers/profesionController');
const { ensureAuthenticated } = require('../lib/auth');

router.get('/add', ensureAuthenticated, profesionController.profesion);

router.get('/table', ensureAuthenticated, profesionController.getProfesion);

router.post('/guardar', ensureAuthenticated, profesionController.addProfesion);

router.post('/actualizar', ensureAuthenticated, profesionController.updateProfesion);

router.get('/editar/:id', ensureAuthenticated, profesionController.getProfesionById);

router.post('/eliminar/:id', ensureAuthenticated, profesionController.deleteProfesion);

module.exports = router;