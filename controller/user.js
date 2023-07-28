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
    console.log("hello");
    //const username = req.body.username;

    //if username given then filter the record otherwise fetch all
    UserModel.find({})
    .exec(function(err,users){
        if(err){
            res.send("No users!");
        }
        else{
            res.send(users)
        }
    })
    //Don't put catch here as find can be null and null.catch() is nothing
    // .catch((err) => {
    //     console.log("Error in fetching users", err)
    //     res.send({
    //         message: err.message
    //     })
    // })

}

module.exports = {
    createUser : createUser,
    fetchUser : fetchUser
}