'use strict'

const express = require('express');
const UsuariosController = require('../controllers/usuarios');

const router = express.Router();

router.get('/search/:correo', UsuariosController.search);


module.exports = router;