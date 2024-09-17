const express = require('express');
const router = express.Router();

const { MedicalRoute } = require('../controllers/medicalrecord.controller');

router.post('/medicalRecord', MedicalRoute)

module.exports = router;