const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  studentId: {
    type: String,
    required: [true, "Please Enter the Id"],
  },
  name: {
    type: String,
    required: [true, "Please Enter the student name"],
  },
  mentor: {
    type: String,
    default: null,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
