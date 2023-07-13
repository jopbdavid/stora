const express = require("express");
const router = express.Router();
const {
  addClass,
  editClass,
  deleteClass,
  getAllClasses,
} = require("../controllers/class");

router.route("/").post(addClass).get(getAllClasses);
router.route("/:id").patch(editClass).delete(deleteClass);

module.exports = router;
