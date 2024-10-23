const express = require('express');
const router = express.Router();
const { tambahMR, updateMedicalRecord } = require('../controllers/suster.controller');
const { MedicalRoute, getAllMedicalRecords } = require('../controllers/medicalrecord.controller');

// Retrieve all medical records
router.get('/medical', getAllMedicalRecords);

// Create a new medical record
router.post('/medicalRecord', MedicalRoute);

router.post('/tambah', tambahMR);
router.put('/updateMR', updateMedicalRecord);

module.exports = router;