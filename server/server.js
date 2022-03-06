const express = require("express");
const connectionDB = require("./config/connectDB");
require("dotenv").config({path: __dirname + "/config/.env"});
const authRegister = require("./routes/authRegister");
const authLogin = require("./routes/authLogin");
const authLogout = require("./routes/authLogout");
const auth = require("./routes/auth");
const authRefresh = require("./routes/authRefresh");
const jwtauth = require("./middleware/auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,

}));

const port = process.env.PORT || 5000;

connectionDB().then((conn) =>{
    console.log(`connected to DB: ${conn.connections[0].host}`)
});


app.use("/auth/register/", authRegister);

app.use("/auth/login", authLogin);

app.use("/auth/logout", authLogout);

app.use("/auth", auth);

app.use("/auth/refresh", authRefresh);


app.listen(port, () =>{
    console.log(`Server is running and listening at port: ${port}`);
})