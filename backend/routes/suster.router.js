const express = require('express');
const router = express.Router();
const susterController = require('../controllers/suster.controller');
const { tambahMR } = require('../controllers/suster.controller');

router.post('/tambah', tambahMR); // Rute untuk menambah rekam medis
router.get('/medical/:nomorMR', susterController.getRekamMedisByNomorMR);

module.exports = router;