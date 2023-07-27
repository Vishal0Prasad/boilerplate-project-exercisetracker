let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true
    }
})

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;