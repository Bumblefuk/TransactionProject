const router = require("express").Router();
const User = require("../models/User");
const jwtauth = require("../middleware/auth");

router.get("/", jwtauth, (req, res) =>{
    User.findById(req.user.id)
        .select("-password")
        .then((userLogged) =>{
            res.status(200).json({
                success: true,
                user: {
                    id: userLogged.id,
                    firstName: userLogged.firstName,
                    lastName: userLogged.lastName,
                }
            })
        })
        .catch((error) =>{
            res.status(500).json({
                success: false,
                error: error.message
            })
        })
})

module.exports = router