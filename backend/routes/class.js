const express = require("express");
const router = express.Router();
const { addClass, editClass, deleteClass } = require("../controllers/class");

router.route("/").post(addClass);
router.route("/:id").patch(editClass).delete(deleteClass);

module.exports = router;
