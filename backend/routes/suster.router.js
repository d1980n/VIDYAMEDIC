const express = require('express');
const router = express.Router();
const susterController = require('../controllers/suster.controller');
const { MedicalRoute } = require('../controllers/medicalrecord.controller');

router.post('/tambah', MedicalRoute.tambahRekamMedis);
router.get('/medical/:nomorMR', susterController.getRekamMedisByNomorMR);
router.post('/medical', MedicalRoute)

module.exports = router;