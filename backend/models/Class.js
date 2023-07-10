const mongoose = require("mongoose");
const { BadRequestError } = require("../errors");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    sparse: true,
  },
  year: {
    type: Number,
    required: [true, "Please provide year/grade"],
    enum: [5, 6, 7, 8, 9],
    default: 5,
  },
  letter: {
    type: String,
    required: [true, "Please provide letter"],
    enum: ["A", "B", "C", "D", "E", "F", "G"],
    default: "A",
    maxlength: 1,
  },
  classProfessor: {
    type: String,
    required: [true, "Please provide a class professor"],
    trim: true,
    maxlength: 20,
  },
  students: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
  ],
  teachers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

classSchema.pre("save", async function (next) {
  if (!this.isNew) {
    this.name = `${this.year}º${this.letter}`;
    return next();
  }
  this.name = `${this.year}º${this.letter}`;
  const existingClass = await mongoose
    .model("Class")
    .findOne({ name: this.name });
  if (existingClass) {
    throw new BadRequestError("Class already exists.");
  }
  next();
});

module.exports = mongoose.model("Class", classSchema);
