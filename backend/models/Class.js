const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide class name"],
    maxlength: 5,
    minlength: 1,
  },
  year: {
    type: String,
    required: [true, "Please provide email"],
    enum: ["5º", "6º", "7º", "8º", "9º"],
  },
  letter: {
    type: String,
    required: [true, "Please provide letter"],
    maxlength: 1,
  },
  classProfessor: {
    type: String,
    required: [true, "Please provide a class professor"],
    trim: true,
    maxlength: 20,
  },
});

module.exports = mongoose.model("Class", classSchema);
