const UserModel = require("../models/user");

function createUser(req, res){
    //create user
    const username = req.body.username;
    const newUser = new UserModel({
        username: username
    })

    newUser.save()
    .then((user) => {
        console.log("Successfull created the user!");
        res.send({
            username: user.username,
            _id: user._id
        })
    })
    .catch((err) => {
        console.log("Error creating new user: ",  err);
    })

}

function fetchUser(){
    //fetch user
}

module.exports = {
    createUser : createUser,
    fetchUser : fetchUser
}