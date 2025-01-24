const express = require('express');
const { tambahPasien, getAllPatients, getPatientById, cancelAntrian, searchPatients, updateAntrianStatus, susterAntri, dokterAntri, dokterPeriksa, statusSelesai, panggilStatus, getAllPatientsWithMedicalRecords } = require('../controllers/patients.controller');
const { updateCurrentDokter } = require('../controllers/suster.controller');

const router = express.Router();

router.post('/tambah', tambahPasien);
// Retrieve all patients
router.get('/', getAllPatients);

router.get('/patients-with-medical-records', getAllPatientsWithMedicalRecords);

//update current dokter
router.post('/updateCurrentDokter/:nomorMR', updateCurrentDokter);

// Retrieve a single patient by ID
router.get('/patients/:nomorMR', getPatientById);

router.put('/cancelAntrian', cancelAntrian);
router.get('/search', searchPatients);
router.put('/susterAntri', susterAntri);
router.put('/update/:nomorMR', updateAntrianStatus);
router.put('/dokterAntri', dokterAntri);
router.put('/dokterPeriksa', dokterPeriksa);
router.post('/statusSelesai', statusSelesai);
router.post('/panggilStatus', panggilStatus);




module.exports = router;