// Package
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const { errorHandler } = require('../utils/error.js');

// Models
const Person = require('../models/person.model');

// function get person
const getPerson = async(req, res, next) => {
    try {
        const user = await Person.findById(req.params.id);
        if (!user) return next(errorHandler(404, 'User not found!'));
        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

// delete Person
// delete Person tanpa verifikasi token
const deletePerson = async(req, res, next) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        await Person.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
};





//   Update Person
const updatePerson = async(req, res, next) => {
    try {  
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!isValidId) {
            return next(errorHandler(400, 'Invalid ID format'));
        }

        if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'You can only update your own account!'));

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await Person.findByIdAndUpdate(
            req.params.id, {
                $set: {
                    nik: req.body.nik,
                    nama: req.body.nama,
                    email: req.body.email,
                    role: req.body.role,
                    poli: req.body.poli,
                    no_hp: req.body.no_hp,
                    password: req.body.password,
                    alamat: req.body.alamat,
                    jenisKelamin: req.body.jenisKelamin,
                    tl: req.body.tl,
                    profilePicture: req.body.profilePicture,
                },
            }, { new: true }
        );

        if (!updatedUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPerson,
    deletePerson,
    updatePerson
}