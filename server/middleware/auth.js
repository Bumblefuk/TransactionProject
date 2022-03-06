const jwt = require("jsonwebtoken");
const blackList = require("../models/BlackList");
const User = require("../models/User")

function auth(req, res, next) {
    const token = req.headers["authorization"].split(" ")[1];
    const refreshToken = req.cookies.jwtR;

    //check if access token is provided
    if(!token) res.status(401).json({ success: false, message: "No token provided. Authorization denied" });

    //check if refresh token is provided
    if(!refreshToken) res.status(401).json({ success: false, message: "Nos token provided. Authorization denied" });

    User.findOne({refreshToken: refreshToken}).then((result) =>{

        //check if user have session on
        if(result === null)
            return res.status(403).json({success: false, message: "No Session"});

        //check if the token is not  blacklisted like user logged out
        blackList.findOne({token: token}).then((tokenBlacked) =>{
            if(tokenBlacked) return res.status(403).json({success: false, message: "access denied"});
            try {

                //check autenicity of token
                const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
                req.user = decoded;
                next();
                } 
            catch (error) {
                res.status(400).json({ success: false, message: error.message})
                }
        })
    })
    .catch(error => console.log(error));
 }

 module.exports = auth;