// Import Package
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../utils/error.js');
// Models
const Person = require('../models/person.model');

// Register Function
const signup = async (req, res, next) => {
    const { nik, nama, email, no_hp, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new Person({ nik, nama, email, no_hp, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {
      next(error);
    }
  };


// Login Function   
const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await Person.findOne({  });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };

//   SignOut Function
const signOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    signup,
    signin,
    signOut
};