const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  addStudent,
  editStudent,
  deleteStudent,
  getStudent,
  getStudentsList,
} = require("../controllers/student");
const Student = require("../models/Student");

router.route("/").get(getAllStudents).post(addStudent).get(getStudentsList);

router.route("/:id").patch(editStudent).get(getStudent).delete(deleteStudent);

module.exports = router;
