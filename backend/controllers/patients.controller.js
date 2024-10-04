const Patient = require('../models/patient.model');

const tambahPasien = async(req, res, next) => {
    const {
        namaLengkap,
        jenisKelamin,
        alamatLengkap,
        email,
        phone_number,

    } = req.body;

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



// Controller untuk memperbarui status antrian suster
const susterAntri = async(req, res) => {
    const { nomorMR } = req.body; // Mengambil nomorMR dari body request

    try {
        const pasien = await Patient.findOneAndUpdate({ nomorMR: nomorMR }, {
                $set: {
                    'antrianStatus.susterAntriStatus': true,
                    'antrianStatus.status': false // Menyetel status antrian menjadi false
                }
            }, // Update properti susterAntriStatus
            { new: true } // Mengembalikan data yang sudah diupdate
        );

        if (!pasien) {
            return res.status(404).json({ message: 'Pasien dengan nomorMR ini tidak ditemukan' });
        }

        res.json({ success: true, message: 'Status antrian suster berhasil diperbarui', pasien });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui status antrian suster', error });
    }
};

const dokterAntri = async(req, res) => {
    const { nomorMR } = req.body; // Mengambil nomorMR dari body request

    try {
        const pasien = await Patient.findOneAndUpdate({ nomorMR: nomorMR }, {
                $set: {
                    'antrianStatus.dokterAntriStatus': true,
                    'antrianStatus.susterAntriStatus': false // Menyetel status antrian menjadi false
                }
            }, // Update properti susterAntriStatus
            { new: true } // Mengembalikan data yang sudah diupdate
        );

        if (!pasien) {
            return res.status(404).json({ message: 'Pasien dengan nomorMR ini tidak ditemukan' });
        }

        res.json({ success: true, message: 'Status antrian dokter berhasil diperbarui', pasien });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui status antrian dokter', error });
    }
};

const dokterPeriksa = async(req, res) => {
    const { nomorMR } = req.body; // Mengambil nomorMR dari body request

    try {
        const pasien = await Patient.findOneAndUpdate({ nomorMR: nomorMR }, {
                $set: {
                    'antrianStatus.dokterPeriksaStatus': true // Menyetel status antrian menjadi false
                }
            }, // Update properti susterAntriStatus
            { new: true } // Mengembalikan data yang sudah diupdate
        );

        if (!pasien) {
            return res.status(404).json({ message: 'Pasien dengan nomorMR ini tidak ditemukan' });
        }

        res.json({ success: true, message: 'Status periksa dokter berhasil diperbarui', pasien });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui status periksa dokter', error });
    }
};
const statusSelesai = async(req, res) => {
    const { nomorMR } = req.body; // Mengambil nomorMR dari body request

    try {
        const pasien = await Patient.findOneAndUpdate({ nomorMR: nomorMR }, {
                $set: {
                    'antrianStatus.dokterPeriksaStatus': false,
                    'antrianStatus.susterPeriksaStatus': false,
                    'antrianStatus.dokterAntriStatus': false,
                    'antrianStatus.status': false,
                }
            }, // Update properti susterAntriStatus
            { new: true } // Mengembalikan data yang sudah diupdate
        );

        if (!pasien) {
            return res.status(404).json({ message: 'Pasien dengan nomorMR ini tidak ditemukan' });
        }

        res.json({ success: true, message: 'Status periksa dokter berhasil diperbarui', pasien });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui status periksa dokter', error });
    }
};
// Controller untuk membatalkan antrian pasien
const cancelAntrian = async(req, res) => {
    try {
        const { nomorMR } = req.body;
        console.log(nomorMR);

        // Update hanya 'antrianStatus.status' menjadi false
        const pasien = await Patient.findOneAndUpdate({ nomorMR: nomorMR }, { $set: { 'antrianStatus.status': false, 'antrianStatus.susterAntriStatus': false } }, { new: true } // Mengembalikan data yang sudah diupdate
        );

        if (!pasien) {
            return res.status(404).json({ message: 'Pasien dengan nomorMR ini NONO ditemukan' });
        }

        res.json({ success: true, message: 'Antrian berhasil dibatalkan', pasien }); // Kembalikan pasien yang telah diperbarui
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat membatalkan antrian', error });
    }
};

// Controller untuk memperbarui status antrian suster





const searchPatients = async(req, res) => {
    try {
        const searchTerm = req.query.term; // Mendapatkan term pencarian dari query

        // Pastikan searchTerm tidak kosong
        if (!searchTerm) {
            return res.status(400).json({ message: 'Term pencarian tidak boleh kosong' });
        }

        // Query untuk mencari pasien berdasarkan nama, nomor MR, atau nomor telepon
        const patients = await Patient.find({
            $or: [
                { namaLengkap: { $regex: searchTerm, $options: 'i' } }, // Pencarian berdasarkan nama
                { nomorMR: { $regex: searchTerm, $options: 'i' } }, // Pencarian berdasarkan nomor MR
                { phone_number: { $regex: searchTerm, $options: 'i' } } // Pencarian berdasarkan nomor telepon
            ]
        });

        if (patients.length > 0) {
            res.json({ success: true, patients });
        } else {
            res.status(404).json({ message: 'Pasien tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mencari pasien', error });
    }
};



// Update Status Antrian Pasien Berdasarkan Nomor MR
const updateAntrianStatus = async(req, res) => {
    const { nomorMR } = req.params;
    const { antrianStatus } = req.body; // Ini digunakan jika ada pembaruan lain di dalam `antrianStatus`

    try {
        const pasien = await Patient.findOneAndUpdate({ nomorMR: nomorMR }, { $set: { 'antrianStatus.status': true } }, // Update properti status
            { new: true } // Mengembalikan data yang sudah diupdate
        );

        if (!pasien) {
            return res.status(404).json({ message: 'Pasien dengan nomorMR ini KOK ditemukan' });
        }

        res.json({ success: true, message: 'Status antrian berhasil diperbarui', pasien });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate status antrian', error });
    }
};






module.exports = {
    tambahPasien,
    getAllPatients,
    getPatientById,
    cancelAntrian,
    searchPatients,
    updateAntrianStatus,
    susterAntri,
    dokterAntri,
    dokterPeriksa,
    statusSelesai,
};