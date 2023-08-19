const express = require("express");
const { Mentor } = require("../model/mentorSchema");
const { Student } = require("../model/studentSchema");
const app = express();
// 1.API to create Mentor
const createMentor = async (req, res) => {
  try {
    if (!req.body.name || !req.body.mentorId) {
      return res.status(404).send({ error: "Name and mentorId are required" });
    }

    const mentor = await Mentor.create(req.body);
    res.send(mentor);
  } catch (err) {
    res.status(500).send({ error: "Error creating mentor" });
  }
};

const creatStudent = async (req, res) => {
  try {
    if (!req.body.name || !req.body.studentId) {
      return res.status(400).send({
        message: "Name and studentId are required",
      });
    }

    const student = await Student.create(req.body);
    res.send(student);
  } catch (err) {
    res.status(500).send({
      error: "Error creating student",
    });
    console.log(err);
  }
};
// 3 a. API to assign a student to a mentor
const assignMentor = async (req, res) => {
  try {
    const studentId = req.query.studentId;
    const mentorId = req.query.mentorId;

    const student = await Student.findOneAndUpdate(
      { studentId },
      { mentor: mentorId },
      { new: true }
    );

    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    res.status(200).send({ message: "Mentor assigned successfully", student });
  } catch (error) {
    res.status(500).send({
      message: "Error assigning the student to mentor",
      error: error.message,
    });
  }
};

// 4 b. API to get the list of unassigned students

const UnassignedStudent = async (req, res) => {
  try {
    const UnassignedStudents = await Student.find({
      mentor: { $in: [null, undefined] },
    });
    res.status(200).send(UnassignedStudents);
  } catch (error) {
    res.status(400).send({
      message: `Error: ${error}`,
    });
  }
};
// 5.API to assign or change a mentor for a specific student

const assigendmentor = async (req, res) => {
  try {
    const studentId = req.query.studentId;
    const mentorId = req.query.mentorId;

    // Check if the student and mentor exist in the database
    const student = await Student.findById(studentId);
    const mentor = await Mentor.findById(mentorId);

    if (!student) {
      return res.status(404).send({
        message: "Student not found",
      });
    }

    if (!mentor) {
      return res.status(400).send({
        message: "Mentor not found",
      });
    }

    // Check if the student already has the same mentor
    if (student.mentor && student.mentor.equals(mentor._id)) {
      return res.status(400).send({
        message: "Student is already assigned to this mentor",
      });
    }

    student.mentor = mentor._id; // Assign the new mentor to the student
    await student.save();

    res.status(200).send({
      message: "Mentor successfully assigned to the student",
      student,
    });
  } catch (error) {
    res.status(500).send({
      error: `Error assigning mentor to student: ${error}`,
    });
  }
};

// 6.API to get all students for a particular mentor

const allStudentsInOneMentor = async (req, res) => {
  try {
    const mentorId = req.query.mentorId;
    console.log(req.query.mentorId);

    // Check if the mentor exists in the database
    const mentor = await Mentor.find({ mentorId: mentorId });
    console.log(mentor);
    if (!mentor) {
      return res.status(404).send({ message: "Mentor not found" });
    }

    // Find all students assigned to the mentor
    const students = await Student.find({ mentor: mentorId });

    return res.status(200).send(students); // Send the students as JSON response
  } catch (err) {
    res.status(500).send({ message: `Error: ${err}` });
  }
};
// 7.API to get the previously assigned mentor for a particular student

const particularStudents = async (req, res) => {
  try {
    const studentId = req.query.studentId;
    console.log(req.query.studentId);
    const student = await Student.find({ studentId: studentId });
    if (!student) {
      return res.status(404).send({
        message: "No previous mentor assigneds",
      });
    }
    if (!student.mentor) {
      return res.status(200).send({
        message: "No previous mentor assigned",
        mentor: null,
      });
    }
    // Find the mentor of the student
    const mentor = await Mentor.findById(student.mentor);
    if (!mentor) {
      return res.status(404).send({ message: "Previous mentor not found" });
    }
    res.status(200).send({ message: "Previous mentor found", mentor });
  } catch (error) {
    res.status(500).send({
      message: `Error:${error}`,
    });
  }
};

module.exports = {
  allStudentsInOneMentor,
};

module.exports = {
  createMentor,
  creatStudent,
  assignMentor,
  UnassignedStudent,
  assigendmentor,
  allStudentsInOneMentor,
  particularStudents,
};
