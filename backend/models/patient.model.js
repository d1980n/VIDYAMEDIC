const mongoose = require('mongoose');

const antrianStatusSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    waktuAntrian: {
        type: Date,
        required: true,
        default: Date.now,
    },
    keterangan: {
        type: String,
        default: '',
    },
    susterAntriStatus: {
        type: Boolean,
        require: true,
        default: false,
    },
    dokterAntriStatus: {
        type: Boolean,
        require: true,
        default: false,
    },
    dokterPeriksaStatus: {
        type: Boolean,
        require: true,
        default: false,
    },
    panggilStatus: {
        type: Boolean,
        require: true,
        default: false,
    },


});

const patientSchema = new mongoose.Schema({
    namaLengkap: {
        type: String,
        required: true,
    },
    nomorMR: {
        type: String,
        required: true,
        unique: true,
    },
    jenisKelamin: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: false,
    },
    alamatLengkap: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    currentKlinik: {
        type: String,
    },
    currentDokter: {
        type: String,
    },
    antrianStatus: {
        type: antrianStatusSchema,
        required: true,
        default: () => ({}), // Default to an empty object to ensure `antrianStatus` is always present
    },

});

const Patients = mongoose.model('Patients', patientSchema);

module.exports = Patients;