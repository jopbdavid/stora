const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  addStudent,
  editStudent,
  deleteStudent,
  getStudent,
} = require("../controllers/student");
const Student = require("../models/Student");

router.route("/").get(getAllStudents).post(addStudent);
router.route("/:id").patch(editStudent).delete(deleteStudent).get(getStudent);

module.exports = router;
