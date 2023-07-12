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
  const updatedStudent = await Student.updateStudent(
    studentToUpdate,
    updatedFields
  );

  if (studentClass) {
    const newClass = await Class.findOne({ _id: studentClass });

    if (!originalClass || !newClass) {
      throw new NotFoundError("Class not found.");
    }

    originalClass.students.pull(updatedStudent._id);
    newClass.students.addToSet(updatedStudent._id);

    originalClass.markModified("students");
    newClass.markModified("students");

    await Promise.all([originalClass.save(), newClass.save()]);
    studentToUpdate.studentClass = newClass._id;
    studentToUpdate.studentClassName = newClass.name;
  }
  Object.assign(studentToUpdate, updatedFields);
  await studentToUpdate.save();
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
  const deleteStudent = await Student.deleteOne({ _id: id });
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
