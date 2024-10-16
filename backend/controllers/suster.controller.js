const MedicalRecord = require('../models/suster.model');
const cron = require('node-cron');
// Menambahkan rekam medis baru
const tambahMR = async(req, res) => {
    const { nomorMR, TDS, TDD, Temperatur, Nadi, LP, Spot, TB, BB, LILA, AVPU, Keluhan, Anamnesis, Diagnosa, StatusLokalis, Penunjang, RTP, Lab, Xray } = req.body;

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
            Keluhan,
            Anamnesis,
            Diagnosa,
            StatusLokalis,
            Penunjang,
            RTP,
            Lab,
            Xray,
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
        await MedicalRecord.updateMany({ statusMR: false }, { statusMR: false });
        console.log("Update statusMR sukses.");
    } catch (error) {
        console.error("Error saat mengupdate statusMR: ", error);
    }
}, {
    timezone: "Asia/Jakarta" // Pastikan timezone sesuai dengan zona waktu Jakarta
});

// const getPasienDenganStatusMRTrue = async(req, res) => {
//     try {
//         const patient = await MedicalRecord.findOne({ statusMRPeriksa: true });
//         if (!patient) {
//             return res.status(404).json({ message: 'Pasien dengan statusMRPeriksa true tidak ditemukan' });
//         }
//         res.status(200).json(patient);
//     } catch (error) {
//         console.error('Error saat mengambil data pasien:', error);
//         res.status(500).json({ message: 'Gagal mengambil data pasien', error: error.message });
//     }
// };

const updateMedicalRecord = async(req, res) => {
    const { Anamnesis, Diagnosa, Xray, StatusLokalis, Penunjang, RTP, DiagnosaICD11, Rujukan } = req.body;

    try {
        // Cari pasien dengan statusMRPeriksa === true
        const updatedMedicalRecord = await MedicalRecord.findOneAndUpdate({ statusMRPeriksa: true }, // Kondisi pencarian
            {
                $set: {
                    Anamnesis,
                    Diagnosa,
                    Xray,
                    StatusLokalis,
                    Penunjang,
                    RTP,
                    DiagnosaICD11,
                    Rujukan,
                },
            }, { new: true } // Kembalikan data yang baru
        );

        if (!updatedMedicalRecord) {
            return res.status(404).json({ message: 'Rekam medis dengan statusMRPeriksa true tidak ditemukan' });
        }

        res.status(200).json(updatedMedicalRecord);
    } catch (error) {
        console.error('Error saat mengupdate rekam medis:', error);
        res.status(500).json({ message: 'Gagal mengupdate rekam medis', error: error.message });
    }
};


module.exports = {
    tambahMR,
    updateMedicalRecord,
    // getPasienDenganStatusMRTrue,

};