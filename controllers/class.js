const { queryDb } = require("../db/db.js");
const { validateClassName } = require("../helper/helper.js");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

//________________________________________________
//ADD CLASS CONTROLLER____________________________
const addClass = async (req, res) => {
  const { year, letter, classProfessor } = req.body;
  const name = `${year}º${letter}`;
  console.log(classProfessor);
  const directorQuery = `SELECT teacher_id, first_name, email FROM stora_app."Teachers" WHERE email = $1`;
  const insertQuery = `INSERT INTO stora_app."classes"(
	 class_name, director_id, director_name, year)
	VALUES ($1, $2, $3, $4) RETURNING *`;

  try {
    const formattedName = validateClassName(name, year);
    const directorId = await queryDb(directorQuery, [classProfessor]);
    console.log(directorId.rows[0]);
    if (directorId.rows.length === 0) {
      throw new NotFoundError("Teacher not found.");
    }

    const result = await queryDb(insertQuery, [
      name,
      directorId.rows[0].teacher_id,
      directorId.rows[0].first_name,
      year,
    ]);

    const newClass = result.rows[0];
    console.log(newClass);
    res
      .status(StatusCodes.CREATED)
      .json({ id: newClass.class_id, name: newClass.class_name });
  } catch (error) {
    console.log(error);
    // Handle errors, such as if the user already exists (unique constraint violation, etc.)
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
//________________________________________________

//________________________________________________
//EDIT CLASS CONTROLLER____________________________
const editClass = async (req, res) => {
  const { id } = req.params;
  const { name, year, directorEmail } = req.body;
  if (!name || !year || !directorEmail) {
    throw new BadRequestError("Please provide all values.");
  }
  const classToUpdateQuery = `SELECT class_id, class_name, director_id, director_name, year FROM stora_app."classes" WHERE class_id = $1`;
  const directorQuery = `SELECT teacher_id, first_name, email FROM stora_app."Teachers" WHERE email = $1`;
  const updatedClassQuery = `UPDATE stora_app."classes" SET class_name = $1, director_id = $2, director_name = $3, year = $4 WHERE class_id = $5 RETURNING *`;
  try {
    //Check if class exists in DB
    const classToUpdate = await queryDb(classToUpdateQuery, [id]);
    if (classToUpdate.rows.length === 0) {
      throw new NotFoundError("Class not found.");
    }
    //checks if teacher exists in DB
    const directorId = await queryDb(directorQuery, [directorEmail]);
    if (directorId.rows.length === 0) {
      throw new NotFoundError("Teacher not found.");
    }
    const formattedName = validateClassName(name, year);
    const updatedClass = await queryDb(updatedClassQuery, [
      name,
      directorId.rows[0].teacher_id,
      directorId.rows[0].first_name,
      year,
      id,
    ]);

    res.status(StatusCodes.OK).json({
      class: updatedClass.rows[0].class_name,
      director: updatedClass.rows[0].director_name,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
//________________________________________________

//________________________________________________
//DELETE CLASS CONTROLLER____________________________
const deleteClass = async (req, res) => {
  const { id } = req.params;

  const classToDeleteQuery = `SELECT class_id FROM stora_app."classes" WHERE class_id = $1`;
  const classDeletedQuery = `DELETE FROM stora_app."classes" WHERE class_id = $1`;
  try {
    //Check if class exists in DB
    const classToDelete = await queryDb(classToDeleteQuery, [id]);

    if (classToDelete.rows.length === 0) {
      throw new NotFoundError("Class not found.");
    }
    //Delete class from DB
    const deletedClass = await queryDb(classDeletedQuery, [id]);

    res.status(StatusCodes.OK).json({ msg: "Class deleted" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
//________________________________________________

//________________________________________________
//GET ALL CLASS CONTROLLER____________________________
const getAllClasses = async (req, res) => {
  const getAllClassesQuery = `SELECT class_id, class_name, director_id, director_name, year FROM stora_app."classes"`;
  try {
    const classes = await queryDb(getAllClassesQuery);
    console.log(classes.rows);
    if (classes.rows.length === 0) {
      throw new NotFoundError("No classes found.");
    }
    const totalClasses = classes.rows.length;
    res.status(StatusCodes.OK).json({ classes: classes.rows, totalClasses });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
//_____________________________________________________

module.exports = { addClass, editClass, deleteClass, getAllClasses };
