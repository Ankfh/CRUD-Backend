const mongoose = require("mongoose");

const postingSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  postImage: {
    type: String,
  },

  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("post", postingSchema);
