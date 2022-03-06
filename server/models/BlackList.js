const mongoose = require("mongoose");


const BlackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Must enter a token to Blacklisted"]
    }
})

module.exports = new mongoose.model("blackList", BlackListSchema);