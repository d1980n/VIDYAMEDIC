const express = require('express');
const { tambahPasien, getAllPatients, getPatientById, cancelAntrian, searchPatients, updateAntrianStatus, susterAntri, dokterAntri, dokterPeriksa, statusSelesai } = require('../controllers/patients.controller');

const router = express.Router();

router.post('/tambah', tambahPasien);
// Retrieve all patients
router.get('/', getAllPatients);

// Retrieve a single patient by ID
router.get('/patients/:nomorMR', getPatientById);

router.put('/cancelAntrian', cancelAntrian);
router.get('/search', searchPatients);
router.put('/susterAntri', susterAntri);
router.put('/update/:nomorMR', updateAntrianStatus);
router.put('/dokterAntri', dokterAntri);
router.put('/dokterPeriksa', dokterPeriksa);
router.put('/statusSelesai', statusSelesai)




module.exports = router;