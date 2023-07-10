const mongoose = require("mongoose");
const { NotFoundError } = require("../errors");
const Class = require("../models/Class");

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
    },
    gender: {
      type: String,
      required: [true, "Please provide gender"],
      enum: ["male", "female"],
    },
    year: {
      type: Number,
      required: [true, "Please provide year/grade"],
      enum: [5, 6, 7, 8, 9],
      default: 5,
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
    studentClass: {
      type: mongoose.Types.ObjectId,
      ref: "Class",
      required: [true, "Please provide class"],
    },
    studentClassName: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const classObj = await mongoose
      .model("Class")
      .findOne({ _id: this.studentClass });
    if (!classObj) {
      throw new NotFoundError("Class not found.");
    }
    this.studentClassName = classObj.name;
    classObj.students.push(this._id);
    classObj.markModified("students");
    await classObj.save();
  }
  next();
});

studentSchema.post("findOneAndDelete", async function (doc, next) {
  const classObj = await mongoose
    .model("Class")
    .findOne({ _id: doc.studentClass });
  if (!classObj) {
    throw new NotFoundError("Class not found.");
  }

  classObj.students.pull(doc._id);

  classObj.markModified("students");
  await classObj.save();
  next();
});

studentSchema.statics.updateStudent = async function (
  studentToUpdate,
  updatedFields
) {
  const {
    firstName,
    lastName,
    dateOfBirth,
    year,
    address,
    gender,
    email,
    guardianName,
    guardianContact,
    studentClass,
  } = updatedFields;

  studentToUpdate.firstName = firstName || studentToUpdate.firstName;
  studentToUpdate.lastName = lastName || studentToUpdate.lastName;
  studentToUpdate.dateOfBirth = dateOfBirth || studentToUpdate.dateOfBirth;
  studentToUpdate.year = year || studentToUpdate.year;
  studentToUpdate.address = address || studentToUpdate.address;
  studentToUpdate.gender = gender || studentToUpdate.gender;
  studentToUpdate.email = email || studentToUpdate.email;
  studentToUpdate.guardianName = guardianName || studentToUpdate.guardianName;
  studentToUpdate.guardianContact =
    guardianContact || studentToUpdate.guardianContact;

  if (
    studentClass &&
    studentClass.toString() !== studentToUpdate.studentClass.toString()
  ) {
    const originalClass = await Class.findOne({
      _id: studentToUpdate.studentClass,
    });
    const newClass = await Class.findOne({ _id: studentClass });
    if (!originalClass || !newClass) {
      throw new NotFoundError("Class not found.");
    }

    originalClass.students.pull(studentToUpdate._id);

    if (!newClass.students.includes(studentToUpdate._id)) {
      newClass.students.push(studentToUpdate._id);
    }

    originalClass.markModified("students");
    newClass.markModified("students");

    await Promise.all([originalClass.save(), newClass.save()]);
  }
  studentToUpdate.studentClass = studentClass;
  return studentToUpdate;
};

module.exports = mongoose.model("Student", studentSchema);
