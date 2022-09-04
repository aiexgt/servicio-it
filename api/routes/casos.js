'use strict'

const express = require('express');
const CasosController = require('../controllers/casos');

const router = express.Router();

router.post('/add', CasosController.add);
router.get('/read', CasosController.read);


module.exports = router;