const express = require('express');
const router = express.Router();
const controlController = require('../controllers/controlController');

router.get('/add', controlController.control);

router.get('/table', controlController.getControl);

router.post('/guardar/control', controlController.addControl);

router.post('/actualizar/control', controlController.updateControl);

router.get('/editar/:id', controlController.getControlById);

router.post('/eliminar/:id', controlController.deleteControl);

module.exports = router;