const express = require('express');
const router = express.Router();

const { MedicalRoute, getAllMedicalRecords } = require('../controllers/medicalrecord.controller');

// Retrieve all medical records
router.get('/medical', getAllMedicalRecords);

// Create a new medical record
router.post('/medicalRecord', MedicalRoute);

module.exports = router;