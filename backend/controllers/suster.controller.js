const MedicalRecord = require('../models/suster.model');

// Menambahkan rekam medis baru
const tambahMR = async(req, res) => {
    const { nomorMR, TDS, TDD, Temperatur, Nadi, LP, Spot, TB, BB, LILA, AVPU } = req.body;

    try {
        const newMedicalRecord = new MedicalRecord({
            nomorMR,
            TDS,
            TDD,
            Temperatur,
            Nadi,
            LP,
            Spot,
            TB,
            BB,
            LILA,
            AVPU,
        });

        const savedMedicalRecord = await newMedicalRecord.save();
        console.log('Pasien berhasil disimpan:', savedMedicalRecord);
        res.status(201).json(savedMedicalRecord);
    } catch (error) {
        console.error('Error saat menyimpan pasien:', error);
        res.status(500).json({ message: 'Gagal menyimpan rekam medis', error: error.message });
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

module.exports = {
    tambahMR,
};