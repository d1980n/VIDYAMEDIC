const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    nik: {
        required: true,
        unique: true,
        type: String,
    },
    jenisKelamin: {
        required: false,
        type: String,
    },
    nama: {
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
    role: {
        required: true,
        type: String,
    },
    alamat: {
        type: String,
        // required: true,
    },
    tl: {
        type: Date,
        required: false,
    },
    password: {
        required: true,
        type: String,
    },
    profilePicture: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    poli: {
        required: false,
        type: String,
    }
})
const Person = mongoose.model("person", personSchema);
module.exports = Person;