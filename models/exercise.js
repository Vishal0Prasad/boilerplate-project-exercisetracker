let mongoose = require("mongoose");

let exerciseSchema = mongoose.Schema({
    userId: String,
    description: String,
    duration: Number,
    date: Date
})

const ExerciseModel = mongoose.model("Exercise", exerciseSchema);

module.exports = ExerciseModel;