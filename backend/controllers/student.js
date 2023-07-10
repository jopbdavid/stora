const Student = require("../models/Student");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const Class = require("../models/Class");

//________________________________________________
//GET ALL STUDENTS CONTROLLER____________________________
const getAllStudents = async (req, res) => {
  const students = await Student.find({});
  if (students.length < 1) {
    throw new NotFoundError("No students found.");
  }
  res.status(StatusCodes.OK).json({ students });
};
//_____________________________________________________

//________________________________________________
//ADD STUDENT CONTROLLER____________________________
const addStudent = async (req, res) => {
  const checkMail = await Student.findOne({ email: req.body.email });
  if (checkMail) {
    throw new BadRequestError("Student already exists.");
  }
  const student = await Student.create(req.body);
  res.status(StatusCodes.CREATED).json({ student });
};
//________________________________________________

//________________________________________________
//GET STUDENT CONTROLLER____________________________
const getStudent = async (req, res) => {
  const student = await Student.findOne({ email: req.body.email });
  if (!student) {
    throw new NotFoundError("Student not found.");
  }

  res.status(StatusCodes.OK).json({ student });
};
//________________________________________________

//________________________________________________
//EDIT STUDENT CONTROLLER____________________________
const editStudent = async (req, res) => {
  const { id } = req.params;
  const studentToUpdate = await Student.findOne({ _id: id });
  if (!studentToUpdate) {
    throw new NotFoundError("Student not found.");
  }

  const updatedStudent = await Student.updateStudent(studentToUpdate, req.body);

  res.status(StatusCodes.OK).json({ updatedStudent });
};
//________________________________________________

//________________________________________________
//DELETE STUDENT CONTROLLER____________________________
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const studentToDelete = await Student.findOne({ _id: id });
  if (!studentToDelete) {
    throw new NotFoundError("Student not found.");
  }
  const deleteStudent = await Student.findOneAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({ msg: "Student deleted." });
};
//________________________________________________

module.exports = {
  getAllStudents,
  addStudent,
  editStudent,
  deleteStudent,
  getStudent,
};
