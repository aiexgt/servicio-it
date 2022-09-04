'use strict'

const express = require('express');
const CasosController = require('../controllers/usuarios');

const router = express.Router();

router.post('/search', CasosController.search);


module.exports = router;