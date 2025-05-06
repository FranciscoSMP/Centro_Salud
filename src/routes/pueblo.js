const express = require('express');
const router = express.Router();
const puebloController = require('../controllers/puebloController');

router.get('/table', puebloController.pueblo);

router.post('/guardar/pueblo', puebloController.addPueblo);

module.exports = router;