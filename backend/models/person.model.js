const mongoose  = require("mongoose");

const personSchema = new mongoose.Schema({
    nik: {
        required: true,
        unique: true,
        type: String,
      },
    nama:{
        required: true,
        type: String,
      },
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
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
})
const Person = mongoose.model("person", personSchema);
module.exports = Person;