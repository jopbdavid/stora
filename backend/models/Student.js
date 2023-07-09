const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "Please provide a name"],
      maxlength: 30,
      minlength: 3,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Please provide a last name"],
      maxlength: 30,
      minlength: 3,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Please provide a date of birth"],
      enum: ["male", "female"],
    },
    Gender: {
      type: String,
      required: [true, "Please provide gender"],
    },
    year: {
      type: String,
      required: [true, "Please provide year/grade"],
      enum: ["5º", "6º", "7º", "8º", "9º"],
      default: "5º",
    },
    address: {
      type: String,
      required: [true, "Please provide a valid address"],
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email"],
      maxlength: 20,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    guardianName: {
      type: String,
      trim: true,
      required: [true, "Please provide a guardian name"],
      maxlength: 30,
    },
    guardianContact: {
      type: Number,
      required: [true, "Please provide a valid number"],
    },
    class: {
      type: mongoose.Types.ObjectId,
      ref: "Class",
      required: [true, "Please provide class"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
