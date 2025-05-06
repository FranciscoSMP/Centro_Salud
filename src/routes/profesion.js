const express = require('express');
const router = express.Router();
const profesionController = require('../controllers/profesionController');

router.get('/table', profesionController.profesion);

router.post('/guardar/profesion', profesionController.addProfesion);

module.exports = router;