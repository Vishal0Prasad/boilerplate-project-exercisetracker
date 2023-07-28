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

//create exercise
router.route("/:id/exercises")
.post(createExercise);

//fetch exercises
router.route("/:id/logs")
.get(fetchExercises);

module.exports = router;