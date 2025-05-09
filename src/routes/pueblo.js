const express = require('express');
const router = express.Router();
const puebloController = require('../controllers/puebloController');

router.get('/add', puebloController.pueblo);

router.get('/table', puebloController.getPueblo);

router.post('/guardar/pueblo', puebloController.addPueblo);

router.post('/actualizar/pueblo', puebloController.updatePueblo);

router.get('/editar/:id', puebloController.getPuebloById);

router.post('/eliminar/:id', puebloController.deletePueblo);

module.exports = router;