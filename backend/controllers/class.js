const Class = require("../models/Class");
const { StatusCodes } = require("http-status-codes");

const addClass = async (req, res) => {
  console.log(req.body);
  const newClass = await Class.create(req.body);
  res.status(StatusCodes.CREATED).json({ newClass });
};

const editClass = async (req, res) => {
  const updatedClass = await Class.findOne(req.body);
  res.status(StatusCodes.OK).json({ updatedClass });
};

const deleteClass = async (req, res) => {
  const deletedClass = await Class.findOneAndDelete(req.body);
  res.status(StatusCodes.OK).json({ deletedClass });
};

module.exports = { addClass, editClass, deleteClass };
