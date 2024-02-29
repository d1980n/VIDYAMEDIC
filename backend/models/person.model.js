const mongoose  = require("mongoose");

const personSchema = new mongoose.Schema({
    nik: {
        required: true,
        unique: true,
        type: String,
      },
    nama:[{
        depan: String,
        tengah: String,
        belakang: String,
    }],
    email: {
        required: true,
        unique: true,
        type: String,
      },
    no_hp: {
        required: true,
        unique: true,
        type: String,
      },
    alamat:[{
        kabkot: String,
        kecamatan: String,
        kelurahan: String,
        desa: String,
        kodepos: String
    }],
    ttl:[{
        tempat: String,
        tanggal: Date
    }],
    password:{
        required: true,
        type: String,
    }
})
const Person = mongoose.model("person", personSchema);
module.exports = Person;