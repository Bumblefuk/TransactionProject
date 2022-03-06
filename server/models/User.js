const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Must enter a First Name"]
    },
    lastName: {
        type: String,
        required: [true, "Must enter a Last Name"]
    },
    email: {
        type: String,
        required: [true, "Must enter an Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Must enter a password"]
    },
    refreshToken: {
        type: String,
        default: "",
    }
})

module.exports = new mongoose.model("user", UserSchema);