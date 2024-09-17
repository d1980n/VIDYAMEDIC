const Patient = require('../models/patient.model');

const tambahPasien = async(req, res, next) => {
    const {
        namaLengkap,
        jenisKelamin,
        alamatLengkap,
        email,
        phone_number,

    } = req.body;

    console.log('Data pasien yang diterima:', {
        namaLengkap,
        jenisKelamin,
        alamatLengkap,
        email,
        phone_number,

    });

    try {
        const newPasien = new Patient({
            namaLengkap,
            nomorMR: generateNomorMR(),
            jenisKelamin,
            alamatLengkap,
            email,
            phone_number,

        });

        const savedPasien = await newPasien.save();
        console.log('Pasien berhasil disimpan:', savedPasien);
        res.status(201).json(savedPasien);
    } catch (error) {
        console.error('Error saat menyimpan pasien:', error);
        next(error);
    }
};


const generateNomorMR = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
const getAllPatients = async(req, res, next) => {
    try {
        const patients = await Patient.find();
        console.log('Patients Data:', patients); // Log untuk memastikan data yang diambil
        res.status(200).json({ success: true, patients });
    } catch (error) {
        console.error('Error saat mengambil data pasien:', error);
        res.status(500).json({ success: false, message: 'Error saat mengambil data pasien.' });
        next(error);
    }
};


// Retrieve a single patient by ID
const getPatientById = async(req, res, next) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        console.error('Error saat mengambil data pasien:', error);
        next(error);
    }
};
const cancelAntrian = async(req, res) => {
    try {
        const { nomorMR } = req.params;

        const pasien = await Patient.findOneAndUpdate(nomorMR, { 'antrianStatus.status': true }, { new: false });

        if (!pasien) {
            return res.status(404).json({ message: 'Pasien dengan nomorMR ini tidak ditemukan' });
        }

        res.json(pasien);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat membatalkan antrian', error });
    }
};


module.exports = {
    tambahPasien,
    getAllPatients,
    getPatientById,
    cancelAntrian,
};