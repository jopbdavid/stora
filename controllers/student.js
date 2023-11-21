const { queryDb } = require("../db/db.js");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

//________________________________________________
//GET ALL STUDENTS CONTROLLER____________________________
const getAllStudents = async (req, res) => {
  const getAllStudentsQuery = `SELECT student_id, first_name, last_name, email, class_id FROM stora_app."students"`;
  try {
    const students = await queryDb(getAllStudentsQuery);
    console.log(students.rows);
    if (students.rows.length === 0) {
      throw new NotFoundError("No students found.");
    }
    const totalStudents = students.rows.length;
    res.status(StatusCodes.OK).json({ students: students.rows, totalStudents });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
//_____________________________________________________

//________________________________________________
//GET STUDENTSLIST BY ID CONTROLLER____________________________
const getStudentsList = async (req, res) => {
  // const studentsIds = req.body;
  // const students = await Student.find({ _id: { $in: studentsIds } });
  // if (students.length < 1) {
  //   throw new NotFoundError("No students found.");
  // }
  // res
  //   .status(StatusCodes.OK)
  //   .json({ students: students, totalStudents: students.length });
};
//_____________________________________________________

//________________________________________________
//ADD STUDENT CONTROLLER____________________________
const addStudent = async (req, res) => {
  const { first_name, last_name, email } = req.body;
  const checkMailQuery = `SELECT first_name, email FROM stora_app."students" WHERE email = $1`;
  const checkMail = await queryDb(checkMailQuery, [email]);

  if (checkMail.rows.length > 0) {
    throw new BadRequestError("Student already exists");
  }
  const addStudentQuery = `INSERT INTO stora_app."students"(first_name, last_name, email) VALUES($1, $2, $3) RETURNING *`;
  try {
    const student = await queryDb(addStudentQuery, [
      first_name,
      last_name,
      email,
    ]);

    res.status(StatusCodes.CREATED).json({
      student: {
        Name: student.rows[0].first_name,
        Email: student.rows[0].email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
//________________________________________________

//________________________________________________
//GET STUDENT CONTROLLER____________________________
const getStudent = async (req, res) => {
  const { email } = re.body;
  const getStudentQuery = `SELECT student_id, first_name, last_name, email, class_id FROM stora_app."students" WHERE email = $1`;
  try {
    const student = await queryDb(getStudentQuery, [email]);
    if (student.rows.length === 0) {
      throw new NotFoundError("Student not found.");
    }
    res.status(StatusCodes.OK).json({ student: student.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
//________________________________________________

//________________________________________________
//EDIT STUDENT CONTROLLER____________________________
const editStudent = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const {
    firstName,
    lastName,
    dateOfBirth,
    guardianName,
    guardianContact,
    guardianEmail,
    className,
    gender,
    address,
    email,
  } = req.body;

  const getClassIdQuery = `SELECT class_id FROM stora_app."classes" WHERE class_name = $1`;
  const checkMailQuery = `SELECT first_name, email FROM stora_app."students" WHERE email = $1`;

  const getStudentQuery = `SELECT student_id, first_name, last_name, email, class_id FROM stora_app."students" WHERE student_id = $1`;
  try {
    if (email !== undefined || email !== "") {
      const checkMail = await queryDb(checkMailQuery, [email]);
      if (checkMail.rows.length > 0) {
        throw new BadRequestError("Email already exists");
      }
    }

    let class_id;

    if (className === undefined || className === "") {
      class_id = null;
    } else {
      const classId = await queryDb(getClassIdQuery, [className]);
      if (classId.rows.length === 0) {
        throw new NotFoundError("Class not found.");
      }
      class_id = classId.rows[0].class_id;
    }

    const student = await queryDb(getStudentQuery, [id]);
    console.log(student.rows[0].email);

    if (student.rows.length === 0) {
      throw new NotFoundError("Student not found.");
    }
    const updateStudentQuery = `UPDATE stora_app."students" SET first_name = $1, last_name = $2, date_of_birth = $3, guardian_name = $4, guardian_contact = $5, guardian_email = $6, class_id = $7, gender = $8, address = $9, email = $10 WHERE student_id = $11 RETURNING *`;
    const updatedStudent = await queryDb(updateStudentQuery, [
      firstName || student.rows[0].first_name,
      lastName || student.rows[0].last_name,
      dateOfBirth || student.rows[0].date_of_birth,
      guardianName || student.rows[0].guardianName,
      guardianContact || student.rows[0].guardian_contact,
      guardianEmail || student.rows[0].guardian_email,
      class_id,
      gender || student.rows[0].gender,
      address || student.rows[0].address,
      email || student.rows[0].email,
      id,
    ]);
    console.log(updatedStudent.rows[0]);
    res.status(StatusCodes.OK).json({
      student: updatedStudent.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

//________________________________________________

//________________________________________________
//DELETE STUDENT CONTROLLER____________________________
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const studentToDeleteQuery = `SELECT student_id, first_name, last_name, email, class_id FROM stora_app."students" WHERE student_id = $1`;

  try {
    const student = await queryDb(studentToDeleteQuery, [id]);
    if (student.rows.length === 0) {
      throw new NotFoundError("Student not found.");
    }
    const deleteStudentQuery = `DELETE FROM stora_app."students" WHERE student_id = $1`;
    await queryDb(deleteStudentQuery, [id]);
    res.status(StatusCodes.OK).json({ msg: "Student deleted." });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
//________________________________________________

module.exports = {
  getAllStudents,
  addStudent,
  editStudent,
  deleteStudent,
  getStudent,
  getStudentsList,
};
