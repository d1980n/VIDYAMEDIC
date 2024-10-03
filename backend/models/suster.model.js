const mongoose = require('mongoose');
const moment = require('moment-timezone');

const medicalRecordSchema = new mongoose.Schema({
    nomorMR: {
        type: String,
        required: true,
    },
    TDS: String,
    TDD: String,
    Temperatur: String,
    Nadi: String,
    LP: String,
    Spot: String,
    TB: String,
    BB: String,
    LILA: String,
    AVPU: String,
    WaktuMedicalCheck: {
        type: Date,
        required: true,
        default: () => moment.tz("Asia/Jakarta").toDate(), // Menggunakan timezone Jakarta
    },
    statusMR: {
        type: Boolean,
        default: false,
        required: true,
    },
});

const MedicalRecord = mongoose.model('medicalrecords', medicalRecordSchema);
module.exports = MedicalRecord;