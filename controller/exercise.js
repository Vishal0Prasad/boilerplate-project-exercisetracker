const ExerciseModel = require("../models/exercise");
const UserModel = require("../models/user");

function validateDate(date){
    let checkedDate = new Date(date);
    if(checkedDate instanceof Date && !isNaN(checkedDate))
        return true
    // if(!date || !Date.parse(date))
    //     return false;

    // const dateSplit = date.split("-");
    // const dateObj = new Date(date);
    // const day = dateObj.getDate();
    // const month = dateObj.getMonth();
    // const year = dateObj.getFullYear();

    // if(Number(dateSplit[0]) === year && Number(dateSplit[1]) === month && Number(dateSplit(2) === day))
    //     return true;

    return false;
}

async function createExercise(req, res){
    //create exercise
    const id = req.params.id;
    const { description, duration, date } = req.body;

    // console.log(req.body);

    const dateObj = validateDate(date) ? new Date(date) : new Date();
    
    UserModel.findById(id, function(err, user){
        if(err)
            return
        
        if(user){
            console.log("user--",user);
            try{
                const newExercise = new ExerciseModel({
                    userId: id,
                    description: description,
                    duration: duration,
                    date: dateObj
                })
                console.log(newExercise);
                newExercise.save()
                .then((exercise) => {
                    console.log("exercise--",exercise)
                    
                    res.send({
                        _id: user._id,
                        username: user.username,
                        date: exercise.date.toDateString(),
                        duration: exercise.duration,
                        description: exercise.description
                    })    
                })
                .catch((err) => {
                    res.send(err.message);
                })
            }
            catch(err){
                res.send(err);
            }

        }
    })

}   

function fetchExercises(req, res){
    //fetch exercise
    const id = req.params.id;
    // let { from, to, limit } = req.query;
    const from = req.query.from ? new Date(req.query.from) : new Date(0);
    const to = req.query.to ? new Date(req.query.to): new Date(Date.now());
    const limit = Number(req.query.limit) || 0;
    console.log(from, to, limit);

    UserModel.findById(id, function(err,user){
        if(err){
            return res.send(err.message);
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
            userId : id,
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
        .sort('-date')
        .limit(limit)
        .exec(function(err, data){
            console.log("data",data);
            if(err){
                console.log(err);
                return res.send(err.message);
                // throw {
                //     message: "Cannot fetch exercises",
                //     code: "EXER_NOTFOUND"
                // }
                
            }
            let output = [];
            //update the dates
            if(data.length > 0){
                data.forEach((datum) => {
                    // console.log("im date!");
                    output.push({
                        description: datum.description,
                        duration: datum.duration,
                        date: datum.date.toDateString()
                    })
                    // datum['date'] = new Date(datum['date']).toDateString();
                })
            }
            // console.log(data);

            res.send({
                username: user.username,
                count: data.length,
                _id: user._id,
                log: output
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