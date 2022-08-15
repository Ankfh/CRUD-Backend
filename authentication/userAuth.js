const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Mongoose } = require("mongoose");
const User = require("../models/user");
const validator = require("validator");
const emailvalidator = require("email-validator");

//function for creating user token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

//fuction for password encrypt and email check
const signup = async (email, password, userName, coordinate) => {
  if (!email || !password || !userName || !coordinate) {
    throw Error("All fields must be filled");
  }
  if (!emailvalidator.validate(email)) {
    throw Error("Email is not valid");
  }
  // if(!validator.isStrongPassword(password)){
  //   throw Error('Password is not strong')
  // }
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw Error("email already in use");
  }
  const userNameExists = await User.findOne({ userName });
  if (userNameExists) {
    throw Error("UserName already in use");
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

//function for user check to login
const signin = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw Error("inCorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("password incorrect");
  }
  return user;
};

module.exports = {
  signin,
  signup,
  createToken,
};
