const ExerciseModel = require("../models/exercise");
const UserModel = require("../models/user");

function validateDate(date){

    if(!date || !Date.parse(date))
        return false;

    const dateSplit = date.split("-");
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    if(Number(dateSplit[0]) === year && Number(dateSplit[1]) === month && Number(dateSplit(2) === day))
        return true;

    return false;
}

function createExercise(req, res){
    //create exercise
    const id = req.params._id;
    const { description, duration, date } = req.body;

    const dateObj = validateDate(date) ? new Date(date) : new Date();

    const newExercise = new ExerciseModel({
        userId: id,
        description: description,
        duration: Number(duration),
        date: dateObj
    })

    newExercise.save()
    .then((exercise) => {
        UserModel.findById({
            _id: exercise.userId
        }, function(err, user){
            if(err){
                console.log("Error in fetching the user!");
                res.send("Something went wrong!");
            }
            else{

                res.send({
                    _id: user._id,
                    username: user.username,
                    date: exercise.date,
                    duration: exercise.duration,
                    description: exercise.description
                })    
            }
        })
    })
    .catch((err) => {
        console.log("Exercise could not be created!", err);
        res.send({
            message: "Exercise could not be created!"
        })
    })
}   

function fetchExercises(req, res){
    //fetch exercise
    const id = req.params._id;
    const { from, to, limit } = req.query;

    UserModel.findById({
        _id: id
    }, function(err,user){
        if(err){
            throw {
                message: "Unable to find user",
                code: "USER_NOTFOUND"
            }
        }  

        //Alternative method using mongodb query pipeline. Works the same. Replaces the find and select methods
        // ExerciseModel.aggregate([
        //     {
        //         $match:{"userId" : String(user._id)}
        //     },
        //     {
        //         $project: {
        //             _id: 0,
        //             description: 1,
        //             duration: 1,
        //             date: 1
        //         }
        //     }
        // ])
        ExerciseModel.find({
            userId : String(user._id),
            date: {
                $gte: from,
                $lte: to
            }
        })
        .select({
            _id: 0,
            description: 1,
            duration: 1,
            date: 1
        })
        .sort({
            date: -1
        })
        .limit(limit)
        .exec(function(err, data){
            console.log(data);
            if(err){
                console.log(err);
                throw {
                    message: "Cannot fetch exercises",
                    code: "EXER_NOTFOUND"
                }
            }
            //update the dates
            data.forEach((datum) => {
                datum.date = datum.date.toDateString();
            })

            res.send({
                username: user.username,
                count: data.length,
                _id: user._id,
                log: [...data]
            })
        })
    })
    .catch((err) => {
        if(err.code === "USER_NOTFOUND")
            res.send({
                message: err.message
            })
        else if(err.code === "EXER_NOTFOUND"){
            res.send({
                message: err.message
            })
        }
    })
}

module.exports = {
    createExercise : createExercise,
    fetchExercises : fetchExercises
}