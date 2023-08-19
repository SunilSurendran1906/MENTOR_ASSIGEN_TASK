const express = require("express");
const router = express.Router();
const { createMentor } = require("../controllers/mentors.controller");

router.post("/", createMentor);

module.exports = router;
