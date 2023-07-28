let mongoose = require("mongoose");

let exerciseSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: false
    }
})

const ExerciseModel = mongoose.model("Exercise", exerciseSchema);

module.exports = ExerciseModel;