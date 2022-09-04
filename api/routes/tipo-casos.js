'use strict'

const express = require('express');
const TipoCasosController = require('../controllers/tipo-casos');

const router = express.Router();

router.get('/read', TipoCasosController.read);


module.exports = router;