const express = require("express");
const router = express.Router();
const {
  addClass,
  editClass,
  deleteClass,
  getAllClasses,
  getSingleClass,
} = require("../controllers/class");

router.route("/").post(addClass).get(getAllClasses);
router.route("/:id").patch(editClass).delete(deleteClass).get(getSingleClass);

module.exports = router;
