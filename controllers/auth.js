const { queryDb } = require("../db/db.js");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const { NotFoundError, UnauthenticatedError } = require("../errors");

//Register user - tested Postman - OK
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const insertQuery = `INSERT INTO stora_app."Teachers"(
	 first_name, last_name, email, password)
	VALUES ($1, $2, $3, $4) RETURNING *`;

  try {
    const result = await queryDb(insertQuery, [
      firstName,
      lastName,
      email,
      hashedPassword,
    ]);

    const newUser = result.rows[0];
    res.status(StatusCodes.CREATED).json({ newUser });
  } catch (error) {
    // Handle errors, such as if the user already exists (unique constraint violation, etc.)
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

//Tested Postman - OK
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please provide a valid email and password");
  }

  const insertQuery = `SELECT email, password, first_name FROM stora_app."Teachers" WHERE email = $1`;
  try {
    const result = await queryDb(insertQuery, [email]);

    if (result.rows.length === 0) {
      throw new NotFoundError("Invalid email or password");
    }
    console.log(result.rows[0].password, password);
    const validatePassword = await bcrypt.compare(
      password,
      result.rows[0].password
    );
    if (!validatePassword) {
      throw new UnauthenticatedError("Invalid email or password");
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: "Login successful, welcome " + result.rows[0].first_name });
  } catch (error) {
    console.log(error);
    // Handle errors, such as if the user already exists (unique constraint violation, etc.)
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  const query = `SELECT * FROM stora_app."Teachers"`;
  try {
    const result = await queryDb(query);

    const users = result.rows.map(({ password, ...user }) => user);

    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

module.exports = { register, login, getAllUsers };
