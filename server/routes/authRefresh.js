const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = require("express").Router();

router.get("/", (req,res) =>{
    const tokenRefresh = req.cookies.jwtR;
    if(!tokenRefresh) return res.json(403).json({success: false, message: "No Token Provided. Not Authorized."});
    User.findOne({refreshToken: tokenRefresh}).select("-password").then((UserFound) =>{
        if(UserFound === null){
            res.status(403).json({success: false, message: "Invalid Token. Not Authorized"});
        }
        try {
            const decoded = jwt.verify(tokenRefresh, process.env.JWT_REFRESH_SECRET)
            //generate access token
            const accessToken = jwt.sign({id: decoded.id}, process.env.JWT_ACCESS_SECRET, {expiresIn: "15m"});
            const refreshToken = jwt.sign({id: decoded.id}, process.env.JWT_REFRESH_SECRET, {expiresIn: "7d"});
            UserFound.refreshToken = refreshToken;
            UserFound.save().then((result) =>{
                res.cookie("jwtR", refreshToken, {maxAge: 7*24*60*60*1000, httpOnly: true});
                res.status(200).json({
                    success: true,
                    user: {
                      firstName: UserFound.firstName,
                      lastName: UserFound.lastName,
                      userID: UserFound.id,
                      token: accessToken
                    }
                  })
            }).catch((err) =>{
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    })
    .catch((error) =>{
        console.log(error);
    })
})

module.exports = router;