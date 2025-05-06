const express = require('express');
const router = express.Router();
const controlController = require('../controllers/controlController');

router.get('/table', controlController.control);

router.post('/guardar/control', controlController.addControl);

module.exports = router;