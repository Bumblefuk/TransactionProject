const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) =>{
    const {email, password} = req.body;
    User.findOne({email})
        .then((userLogin) =>{
            if(userLogin === null) {
                res.setHeader('Error', '1')
                res.send({ success: false, msg: "Wrong email/password combination" })
                return;
            }
            bcrypt.compare(password, userLogin.password)
                  .then((isPasswordEqual) =>{
                      if(isPasswordEqual === false){
                        res.setHeader('Error', '1')
                        res.send({ success: false, msg: "Wrong email/password combination" })
                        return;
                      } 
                      

                      //jwt access token
                      jwt.sign({id: userLogin.id}, process.env.JWT_ACCESS_SECRET, {expiresIn: "15m"}, (error, token) =>{
                          if(error) {
                            res.setHeader('Error', '1')
                            res.send({ success: false, error: error.message })
                            return;
                          }
                          jwt.sign({id: userLogin.id}, process.env.JWT_REFRESH_SECRET, {expiresIn: "7d"}, (error, refreshToken) =>{
                            userLogin.refreshToken = refreshToken;
                            userLogin.save().then((result) =>{
                              res.cookie("jwtR", refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});
                              res.status(200).json({
                                success: true,
                                user: {
                                  firstName: userLogin.firstName,
                                  lastName: userLogin.lastName,
                                  userID: userLogin.id,
                                  token: token
                                }
                              })
                            }).catch((err) => {
                              console.log(err)
                            })
                          })
                        return;
                      })
                  })
                  .catch((error) =>{
                    res.setHeader('Error', '1')
                      res.send({
                          success: false,
                          msg: error.message
                      })
                      return;
                  })       

        })
        .catch((error) =>{
            res.setHeader('Error', '1')
            res.send(error);
            return;
        })
})

module.exports = router;