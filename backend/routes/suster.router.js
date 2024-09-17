const express = require('express');
const router = express.Router();
const susterController = require('../controllers/suster.controller');

// Route untuk menambah rekam medis
router.post('/tambah', susterController.tambahRekamMedis);

// Route untuk mendapatkan rekam medis berdasarkan nomor MR
router.get('/medicalrecords/:nomorMR', susterController.getRekamMedisByNomorMR);

module.exports = router;