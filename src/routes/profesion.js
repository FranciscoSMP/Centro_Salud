const express = require('express');
const router = express.Router();
const profesionController = require('../controllers/profesionController');

router.get('/add', profesionController.profesion);

router.get('/table', profesionController.getProfesion);

router.post('/guardar/profesion', profesionController.addProfesion);

router.post('/actualizar/profesion', profesionController.updateProfesion);

router.get('/editar/:id', profesionController.getProfesionById);

router.post('/eliminar/:id', profesionController.deleteProfesion);

module.exports = router;