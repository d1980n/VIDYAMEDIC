const express = require('express');
const router = express.Router();
const susterController = require('../controllers/suster.controller');
const { tambahMR, updateMedicalRecord } = require('../controllers/suster.controller');

router.post('/tambah', tambahMR);
router.get('/medical/:nomorMR', susterController.getRekamMedisByNomorMR);
router.put('/updateMR', updateMedicalRecord);

module.exports = router;