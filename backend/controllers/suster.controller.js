const MedicalRecord = require('../models/suster.model');
const cron = require('node-cron');
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


        savedMedicalRecord.statusMR = true;
        const updatedMedicalRecord = await savedMedicalRecord.save();

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
cron.schedule('0 0 * * *', async() => {
    console.log("Mengubah statusMR menjadi false pada pukul 00:00");

    try {
        // Update semua record yang memiliki statusMR true
        await MedicalRecord.updateMany({ statusMR: true }, { statusMR: false });
        console.log("Update statusMR sukses.");
    } catch (error) {
        console.error("Error saat mengupdate statusMR: ", error);
    }
}, {
    timezone: "Asia/Jakarta" // Pastikan timezone sesuai dengan zona waktu Jakarta
});


module.exports = {
    tambahMR,
};