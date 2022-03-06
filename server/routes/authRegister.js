const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/", async (req, res) =>{
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName || !email || !password) return res.status(400).json({
        success: false,
        msg: "Please enter all fields"
    })

    const userRegister = new User({firstName, lastName, email, password});
    try {
        const hashed = await bcrypt.hash(userRegister.password, Number(process.env.SALTROUNDS))
        userRegister.password = hashed;
        userRegister.save()
            .then((userReg) =>{
                res.status(200).json({
                    success: true,
                    user: {
                        id: userReg.id,
                        firstName: userReg.firstName,
                        lastName: userReg.lastName,
                        email: userReg.email
                    }
                })
            })
            .catch((error) =>{
                if(error.message.includes("duplicate"))
                    res.status(400).json({
                        success: false,
                        msg: "Email already taken"
                    })
                else{
                    res.status(400).json({
                        success: false,
                        msg: error.message
                    })
                }
            })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            msg: error.message
        })
    }
})

module.exports = router