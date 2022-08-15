const { uploadMissionImage } = require("../helper/missionImage");
const { missionAuth } = require("../authentication/missionAuth");
const missionModel = require("../models/missionModel");
const fs = require("fs");

const addMission = async (req, res, next) => {
  // console.log(req.files);
  try {
    let { missionID, missionName, status, message, missionImage } = req.body;
    await missionAuth(missionID, missionName, status, message);
    // missionImage = "";
    if (req.files) {
      let image = req.files.photo;
      let path = await uploadMissionImage(image);

      missionImage = path;
    }
    const mission = await missionModel.create({
      missionID,
      missionName,
      status,
      message,
      missionImage,
    });

    return res.status(200).json(mission);
  } catch (error) {
    res.status(400).json({ error: error.message });
    // console.log(error);
  }
};

const getAllMission = async (req, res) => {
  const allPost = await missionModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(allPost);
};

/// update mission
const updateMission = async (req, res) => {
  const { id } = req.params;
  try {
    const missionCheck = await missionModel.findById(id);
    let image = req.files ? req.files.photo : missionCheck.missionImage;
    if (!missionCheck) {
      return res.status(400).json({ error: "no such mission found" });
    }
    const change = {
      missionID: req.body.missionID,
      missionName: req.body.missionName,
      status: req.body.status,
      message: req.body.message,
      missionImage: missionCheck.missionImage,
    };
    if (req.files) {
      if (missionCheck.missionImage) {
        fs.unlink(
          `${process.env.MISSION_IMAGE_PATH}/${missionCheck.missionImage}`,
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      }
      const path = await uploadMissionImage(image);
      change.missionImage = path;
    }
    const mission = await missionModel.findByIdAndUpdate(id, change, {
      new: true,
    });

    return res.status(200).json(mission);
  } catch (error) {
    res.status(404).json(error);
    console.log(error);
  }
};

module.exports = {
  addMission,
  getAllMission,
  updateMission,
};
