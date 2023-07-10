const Class = require("../models/Class");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

//________________________________________________
//ADD CLASS CONTROLLER____________________________
const addClass = async (req, res) => {
  const newClass = await Class.create(req.body);
  res.status(StatusCodes.CREATED).json({ newClass });
};
//________________________________________________

//________________________________________________
//EDIT CLASS CONTROLLER____________________________
const editClass = async (req, res) => {
  const { id } = req.params;
  const classToUpdate = await Class.findOne({ _id: id });
  if (!classToUpdate) {
    throw new NotFoundError("Class not found.");
  }
  const { year, letter, classProfessor } = req.body;
  if (!year || !letter || !classProfessor) {
    throw new BadRequestError("Please provide all values.");
  }
  const classUpdated = await Class.findOneAndUpdate(
    { _id: id },
    { year, letter, classProfessor },
    { new: true }
  );
  classUpdated.save();
  res.status(StatusCodes.OK).json({ classUpdated });
};
//________________________________________________

//________________________________________________
//DELETE CLASS CONTROLLER____________________________
const deleteClass = async (req, res) => {
  const { id } = req.params;
  const classToDelete = await Class.findOne({ _id: id });
  if (!classToDelete) {
    throw new NotFoundError("Class not found.");
  }
  const deletedClass = await Class.findOneAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({ msg: "Class deleted." });
};
//________________________________________________

//________________________________________________
//GET ALL CLASS CONTROLLER____________________________
const getAllClasses = async (req, res) => {
  const classes = await Class.find({});
  if (!classes) {
    throw new NotFoundError("No classes found.");
  }
  res.status(StatusCodes.OK).json({ classes });
};
//_____________________________________________________

module.exports = { addClass, editClass, deleteClass, getAllClasses };
