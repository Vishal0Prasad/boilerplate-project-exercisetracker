const app = require("express");
const router = app.Router();

//import validations
const validateUser = require("../middleware/user");
const validateExercise = require("../middleware/exercise");

//import controllers
const { createUser, fetchUser } = require("../controller/user");
const { createExercise, fetchExercises } = require("../controller/exercise");

//user apis
router.route("/")
.post(validateUser, createUser)
.get(fetchUser)

//fetch exercises
router.route("/:_id/logs")
.get(fetchExercises);

//create exercise
router.route("/:_id/exercises")
.post(validateExercise, createExercise);

module.exports = router;