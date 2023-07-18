const Student = require("../models/Student");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const Class = require("../models/Class");
const mongoose = require("mongoose");

//________________________________________________
//GET ALL STUDENTS CONTROLLER____________________________
const getAllStudents = async (req, res) => {
  const students = await Student.find({});
  if (students.length < 1) {
    throw new NotFoundError("No students found.");
  }
  res
    .status(StatusCodes.OK)
    .json({ students: students, totalStudents: students.length });
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
  const student = await Student.findOne({ _id: req.params.id });
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

  const originalClass = await Class.findOne({
    _id: studentToUpdate.studentClass,
  });

  const { studentClass, ...updatedFields } = req.body;

  // Remove the studentClass field from updatedFields
  delete updatedFields.studentClass;

  const updatedStudentClass = studentClass
    ? mongoose.Types.ObjectId(studentClass)
    : studentToUpdate.studentClass;

  const updateOptions = { runValidators: false }; // Turn off runValidators option

  await Student.findOneAndUpdate(
    { _id: studentToUpdate._id },
    { $set: { ...updatedFields, studentClass: updatedStudentClass } },
    updateOptions
  );

  if (studentClass) {
    const newClass = await Class.findOne({ _id: studentClass });

    // if (!originalClass || !newClass) {
    //   throw new NotFoundError("Class not found.");
    // }

    if (studentToUpdate.studentClass) {
      originalClass.students.pull(studentToUpdate._id);
      originalClass.markModified("students");
      await originalClass.save();
    }

    if (
      studentToUpdate.studentClass &&
      studentToUpdate.studentClass.toString() !== newClass._id.toString()
    ) {
      newClass.students.addToSet(studentToUpdate._id);
      newClass.markModified("students");
      await newClass.save();
    } else if (!studentToUpdate.studentClass) {
      newClass.students.addToSet(studentToUpdate._id);
      newClass.markModified("students");
      await newClass.save();
    }

    studentToUpdate.studentClass = updatedStudentClass;
    studentToUpdate.studentClassName = newClass.name;
  } else {
    if (studentToUpdate.studentClass) {
      originalClass.students.pull(studentToUpdate._id);
      originalClass.markModified("students");
      await originalClass.save();

      studentToUpdate.studentClass = null;
      studentToUpdate.studentClassName = null;
    }
  }

  await studentToUpdate.save({ validateBeforeSave: false });
  Object.assign(studentToUpdate, updatedFields);

  res.status(StatusCodes.OK).json({ updatedStudent: studentToUpdate });
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
