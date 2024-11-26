const mongoose = require("mongoose");

const mitraSchema = new mongoose.Schema({
    namaKlinik: {
        type: String,
        required: true,
    },
    no_hp: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const Mitra = mongoose.model("mitra", mitraSchema);
module.exports = Mitra;