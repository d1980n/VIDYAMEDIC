// Package
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');

// Models
const Person = require('../models/person.model');

// function get person
const getPerson = async(req, res, next) => {
    try{    
            const user = await Person.findById(req.params.id);
            if (!user) return next(errorHandler(404, 'User not found!'));
            const { password: pass, ...rest } = user._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error);
    }
}

// delete Person
const deletePerson = async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only delete your own account!'));
    try {
      await Person.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
    } catch (error) {
      next(error);
    }
  };

//   Update Person
const updatePerson = async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only update your own account!'));
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
      const updatedUser = await Person.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            nik: req.body.nik,
            nama: req.body.nama,
            email: req.body.email,
            no_hp: req.body.no_hp,
            password: req.body.password,
          },
        },
        { new: true }
      );
  
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