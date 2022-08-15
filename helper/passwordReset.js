const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.reset = async (email, password) => {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);

  const userCheck = await User.findOne({ email });
  if (!userCheck) {
    throw Error("user not found");
    return;
  } else {
    userCheck.password = hash;
    const reset = userCheck.save();
    // const reset = await User.findOneAndUpdate({ email, password: hash });
    return reset;
  }
};
