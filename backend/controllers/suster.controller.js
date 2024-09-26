const MedicalRecord = require('../models/medicalrecord.model');

// Menambahkan rekam medis baru
exports.tambahRekamMedis = async(req, res) => {
    try {
        const { nomorMR, TDS, TDD, Temp, Nadi, LP, Spot, TB, BB, LILA, AVPU } = req.body;

        // Membuat rekam medis baru
        const newRecord = new MedicalRecord({
            nomorMR,
            TDS,
            TDD,
            Temp,
            Nadi,
            LP,
            Spot,
            TB,
            BB,
            LILA,
            AVPU
        });

        // Simpan rekam medis ke database
        await newRecord.save();

        res.status(201).json({ message: 'Rekam medis berhasil ditambahkan', data: newRecord });
    } catch (error) {
        res.status(500).json({ message: 'Gagal menambahkan rekam medis', error: error.message });
    }
};

// Mendapatkan semua rekam medis berdasarkan nomor MR
exports.getRekamMedisByNomorMR = async(req, res) => {
    try {
        const { nomorMR } = req.params;

        const records = await MedicalRecord.find({ nomorMR });

        if (!records) {
            return res.status(404).json({ message: 'Rekam medis tidak ditemukan' });
        }

        res.status(200).json({ data: records });
    } catch (error) {
        res.status(500).json({ message: 'Gagal mendapatkan rekam medis', error: error.message });
    }
};