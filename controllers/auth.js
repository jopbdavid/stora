const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

//Register user - tested Postman - OK
const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

//Tested Postman - OK
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please provide a valid email and password");
  }
  const user = await User.find({ email: email });
  if (!user) {
    throw new Error("User not found");
  }
  res.status(StatusCodes.OK).json({ user });
};

module.exports = { register, login };
