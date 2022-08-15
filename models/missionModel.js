const mongoose = require("mongoose");

const missionSchema = mongoose.Schema({
  missionID: {
    type: Number,
  },

  missionName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  message: {
    type: String,
  },
  missionImage: {
    type: String,
  },
});

module.exports = mongoose.model("mission", missionSchema);
