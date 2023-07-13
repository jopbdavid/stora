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
      type: String,
      required: [true, "Please provide a date of birth"],
      match: [
        /^(\d{2})\/(\d{2})\/(\d{4})$/,
        "Date of birth must be in the format dd/mm/yyyy.",
      ],
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
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

studentSchema.pre("save", async function (next) {
  if (this.isModified("studentClass")) {
    const originalStudentClass = this.studentClass;
    const newStudentClass = this.studentClass;

    console.log("Original Class ID:", originalStudentClass);
    console.log("New Class ID:", newStudentClass);

    if (
      originalStudentClass &&
      newStudentClass &&
      originalStudentClass.toString() !== newStudentClass.toString()
    ) {
      const originalClass = await Class.findOne({ _id: originalStudentClass });
      const newClass = await Class.findOne({ _id: newStudentClass });

      console.log("Original Class:", originalClass);
      console.log("New Class:", newClass);

      if (!originalClass || !newClass) {
        throw new NotFoundError("Class not found.");
      }

      originalClass.students.pull(this._id);
      newClass.students.addToSet(this._id);

      originalClass.markModified("students");
      newClass.markModified("students");

      await Promise.all([
        originalClass.save({ runValidators: false }),
        newClass.save({ runValidators: false }),
      ]);
    }

    if (newStudentClass) {
      const classObj = await Class.findOne({ _id: newStudentClass });
      if (!classObj) {
        throw new NotFoundError("Class not found.");
      }
      this.studentClassName = classObj.name;
    } else {
      this.studentClassName = "";
    }
  }
  next();
});

studentSchema.post("deleteOne", async function (doc, next) {
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
  if (studentClass) {
    studentToUpdate.studentClass = studentClass;
    await studentToUpdate.save({ validateBeforeSave: false });
  }
  return studentToUpdate;
};

module.exports = mongoose.model("Student", studentSchema);
