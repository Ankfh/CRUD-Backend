const postModel = require("../models/postingModel");

const addPostAuth = async (description, userName, date) => {
  if (!description || !userName || !date) {
    throw Error("All fields must be filled");
  }

  const userNameExists = await postModel.findOne({ userName });
  if (userNameExists) {
    throw Error("UserName already in use");
  }

  return;
};

module.exports = {
  addPostAuth,
};
