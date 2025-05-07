const express = require('express');
const router = express.Router();
const controlController = require('../controllers/controlController');

router.get('/add', controlController.control);

router.get('/table', controlController.getControl);

router.post('/guardar/control', controlController.addControl);

module.exports = router;