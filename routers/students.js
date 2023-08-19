const express = require("express");
const router = express.Router();
const {
  creatStudent,
  assignMentor,
  UnassignedStudent,
  assigendmentor,
  allStudentsInOneMentor,
  particularStudents,
} = require("../controllers/mentors.controller");

router.post("/", creatStudent);
router.put("/", assignMentor);
router.get("/", UnassignedStudent);
router.put("/", assigendmentor);
router.get("/stu", allStudentsInOneMentor);
router.get("/rs", particularStudents);

module.exports = router;
