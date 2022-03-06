const mongoose = require("mongoose");

async function connectDB() { 
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECT);
        return conn;   
    } catch (error) {
        return error;
    }
 }

 module.exports = connectDB;