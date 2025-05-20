const express = require('express');
const router = express.Router();
const tipo_consultaController = require('../controllers/tipo_consultaController');
const { ensureAuthenticated } = require('../lib/auth');

router.get('/add', ensureAuthenticated, tipo_consultaController.tipo_consulta);

router.get('/table', ensureAuthenticated, tipo_consultaController.getTipo_Consulta);

router.post('/guardar', ensureAuthenticated, tipo_consultaController.addTipo_Consulta);

router.post('/actualizar', ensureAuthenticated, tipo_consultaController.updateTipo_Consulta);

router.get('/editar/:id', ensureAuthenticated, tipo_consultaController.getTipo_ConsultaById);

router.post('/eliminar/:id', ensureAuthenticated, tipo_consultaController.deleteTipo_Consulta);

module.exports = router;

