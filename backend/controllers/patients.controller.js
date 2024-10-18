const Patient = require('../models/patient.model');
const MedicalRecord = require('../models/suster.model');

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
        // Update antrianStatus.dokterPeriksaStatus pada collection Patient
        const pasien = await Patient.findOneAndUpdate({ nomorMR: nomorMR }, {
                $set: {
                    'antrianStatus.dokterPeriksaStatus': true
                }
            }, { new: true } // Mengembalikan data yang sudah diupdate
        );

        if (!pasien) {
            return res.status(404).json({ message: 'Pasien dengan nomorMR ini tidak ditemukan' });
        }

        // Update statusMR menjadi true pada collection medicalrecords
        const updatedMedicalRecord = await MedicalRecord.findOneAndUpdate({ nomorMR: nomorMR }, {
                $set: {
                    'statusMRPeriksa': true
                }
            }, { new: true } // Mengembalikan data yang sudah diupdate
        );

        if (!updatedMedicalRecord) {
            return res.status(404).json({ message: 'Medical record untuk nomorMR ini tidak ditemukan' });
        }

        // Mengirimkan response sukses
        res.json({
            success: true,
            message: 'Status periksa dokter dan statusMRPeriksa berhasil diperbarui',
            pasien,
            medicalRecord: updatedMedicalRecord
        });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui status periksa dokter atau statusMRPeriksa', error });
    }
};

const statusSelesai = async(req, res) => {
    console.log('Request diterima di /statusSelesai', req.body); // Menambahkan log ini
    try {
        // Cek apakah statusMRPeriksa === true dikirim
        if (req.body.statusMRPeriksa === true) {
            // Cari semua rekam medis dengan statusMRPeriksa === true
            const medicalRecords = await MedicalRecord.find({ statusMRPeriksa: true });

            if (medicalRecords.length === 0) {
                return res.status(404).json({ message: 'Tidak ada rekam medis dengan statusMRPeriksa === true yang ditemukan' });
            }

            // Ekstrak semua nomorMR dari hasil pencarian rekam medis
            const nomorMR = medicalRecords.map(record => record.nomorMR);

            // Update status pasien berdasarkan nomorMR yang ditemukan
            const updatedPatients = await Patient.updateMany({ nomorMR: { $in: nomorMR } }, {
                $set: {
                    'antrianStatus.status': false,
                    'antrianStatus.susterAntriStatus': false,
                    'antrianStatus.dokterAntriStatus': false,
                    'antrianStatus.dokterPeriksaStatus': false,
                }
            }, { new: true });

            // Cek apakah ada pasien yang diperbarui
            if (updatedPatients.matchedCount === 0) {
                return res.status(404).json({ message: 'Tidak ada pasien yang ditemukan untuk diperbarui' });
            }

            // Update statusMRPeriksa dan statusMR di MedicalRecord
            const updatedMedicalRecords = await MedicalRecord.updateMany({ nomorMR: { $in: nomorMR } }, {
                $set: {
                    statusMRPeriksa: false
                },
                $unset: {
                    statusMR: ""
                }
            }, { new: true });

            // Cek apakah rekam medis berhasil diperbarui
            if (updatedMedicalRecords.matchedCount === 0) {
                return res.status(404).json({ message: 'Tidak ada rekam medis yang diperbarui' });
            }

            // Kirim respons sukses dalam format JSON
            res.status(200).json({ success: true, message: 'Status periksa dan rekam medis berhasil diperbarui' });
        } else {
            res.status(400).json({ success: false, message: 'statusMRPeriksa tidak valid' });
        }
    } catch (error) {
        // Tangani error dengan mengirimkan respons JSON
        console.error('Error during status update:', error); // Menambahkan log ini
        res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui status', error: error.message });
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