const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
    nomorMR: {
        type: String,
        required: true
    },
    TDS: String, // Tekanan Darah Sistolik
    TDD: String, // Tekanan Darah Diastolik
    Temp: String, // Temperatur
    Nadi: String, // Nadi
    LP: String, // Laju Pernafasan
    Spot: String, // Presentase SpO2
    TB: String, // Tinggi Badan
    BB: String, // Berat Badan
    LILA: String, // Lingkar Lengan Atas
    AVPU: String, // Respons AVPU

});

const MedicalRecord = mongoose.model('medicalrecords', MedicalRecordSchema);

module.exports = MedicalRecord;