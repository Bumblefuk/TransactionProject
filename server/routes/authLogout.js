const router = require("express").Router();
const jwtauth = require("../middleware/auth");
const BlackList = require("../models/BlackList");
const User = require("../models/User")

router.get("/", jwtauth, (req, res) =>{
    const token = req.headers["authorization"].split(" ")[1];
    const refreshToken = req.cookies.jwtR;
    //check if cookie exists
    if(!refreshToken) res.status(403).json({success: false, message: "no token provided"});

    //check if user have session on
    User.findOne({refreshToken: refreshToken}).then((result) =>{
        if(result === null) res.status(403).json({success: false, message: "wrong token"});

        result.refreshToken = "";

        result.save().then((result1) =>{
            //blacklisting access token for no more use
            const tokenBlack = new BlackList({token: token});
            tokenBlack.save().then((result2) =>{
                //clearing cooking of refreshtoken
                res.clearCookie("jwtR");
                res.status(403).json({success: true, message: "Sucessfully logged out"})
            }).catch((error) => console.log(error));
        }).catch((err) => console.log(err))
    }).catch((error) => console.log(error));
})

module.exports = router