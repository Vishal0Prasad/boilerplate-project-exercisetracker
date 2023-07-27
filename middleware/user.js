const UserModel = require("../models/user");

function validateUser(req, res, next){
    //validate user
    const username = req.body.username;
    
    UserModel.findOne({
        username: username
    }, function(err, doc){
        if(err){
            res.send("Something went wrong!")
        }
        if(doc){
            res.send("User already present! Please choose a differnt user name");
        }
        else{
            next();
        }
    })
}

module.exports = validateUser; 