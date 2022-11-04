const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const usercontroller = require("../userItems/userController");
const userservice = require("../userItems/userTasks");
require('dotenv').config()



function generateAccessToken(userData) {
    return jwt.sign({ userData }, process.env.TOKEN_SECRET, {
        expiresIn: "2h",
    });
}

router.post("/login", function (req, res, next) {
   
    if (!req.body.password || !req.body.username) {
        res.status(400).json({
            message: "Bad request!"
        });
    }
    
    userservice.getUserbyNamePwdAsync(req.body.username, req.body.password).then((user) => {
    
    if (user.length > 0) {
        
        const accessToken = generateAccessToken({
            id: user[0].idusers,
            username: user[0].username,
        });

        res.status(200).json({
            name: user.username,
            accessToken: accessToken,
        });
    } else {
        res.status(403).json({
            message: "Invalid username or password",
        });
    }});
});

router.post("/register", function (req, res) {
   // console.log(req.body, 1)
        usercontroller.addUser(req, res);
});

module.exports = router;