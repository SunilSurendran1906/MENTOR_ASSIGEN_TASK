const mongoose = require("mongoose");

const mentorSchema = mongoose.Schema({
  mentorId: {
    type: String,
    required: [true, "Please Enter the Id"],
  },
  name: {
    type: String,
    required: [true, "Please Enter the Mentor name"],
  },
  student: {
    type: [],
  },
});

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = { Mentor };
