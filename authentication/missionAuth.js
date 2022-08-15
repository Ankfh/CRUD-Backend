const missionModel = require("../models/missionModel");

const missionAuth = async (
  missionID,
  missionName,
  status,
  message,
  missionImage
) => {
  if (!missionID || !missionName || !status || !message) {
    throw Error("All fields must be filled");
  }

  const missionExists = await missionModel.findOne({ missionID });
  if (missionExists) {
    throw Error("Mission already Exist");
  }

  return;
};

module.exports = {
  missionAuth,
};
