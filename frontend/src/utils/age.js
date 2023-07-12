const moment = require("moment");

function calculateAge(dateOfBirth) {
  const currentDate = moment();
  const dob = moment(dateOfBirth);
  const age = currentDate.diff(dob, "years");

  return age;
}

export default calculateAge;
