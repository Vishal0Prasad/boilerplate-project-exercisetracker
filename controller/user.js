const UserModel = require("../models/user");

function createUser(req, res){
    //create user
    const username = req.body.username;
    const newUser = new UserModel({
        username: username
    })

    newUser.save()
    .then((user) => {
        console.log("Successfully created the user!");
        res.send({
            username: user.username,
            _id: user._id
        })
    })
    .catch((err) => {
        console.log("Error creating new user: ",  err);
    })

}

function fetchUser(req, res){
    //fetch user
    const username = req.body.username;

    UserModel.find({
        username: username
    })
    .select({
        uesrname: 1,
        _id: 1
    })
    .exec(function(err,data){
        if(err){
            res.send("No users!")
        }
        else{
            res.send(data)
        }
    })
    .catch((err) => {
        console.log("Error in fetching the data", err)
        res.send({
            message: "Error in fetching the data"
        })
    })

}

module.exports = {
    createUser : createUser,
    fetchUser : fetchUser
}