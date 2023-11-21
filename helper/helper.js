const { BadRequestError } = require("../errors");

const validateClassName = (name, year) => {
  console.log(name, year);
  const namePattern = /^(\d{1,2})º[A-Z]$/;
  const match = name.match(namePattern);
  if (!match) {
    throw new BadRequestError(
      'Class name format is incorrect. It should be "Yearº LETTER".'
    );
  }
  const nameYear = parseInt(match[1], 10);
  console.log(nameYear);
  if (nameYear !== parseInt(year)) {
    throw new BadRequestError(
      "The year in the class name does not match the year provided."
    );
  }
  return name;
};

module.exports = { validateClassName };
