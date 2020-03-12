const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User.js");
const keys = require("../config/keys");
const router = express.Router();


router.post("/login", (req , res) => {
    User.findOne({
        email: req.body.email
    },(err, user) => {
        if (err) throw err;
        if (!user) {
            res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    user = {
                        email : user.email,
                        role : user.role,
                        _id : user._id.toString()
                    }
                    var token = jwt.sign(user, keys.passport_jwt.secretOrKey, {
                        expiresIn: 7*24*60*60 //1 week in in seconds
                    });
                    res.json({ success: true, token: 'Bearer ' + token , expiresIn: 7*24*60*60});
                } else {
                    res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
            });
        }
    });
});

router.post("/register", async(req , res) => {
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, message: 'Please enter email and password.' });
    } else {

        
        //Attempt to save the user
        newUser.save((err) => {
            if (err) {
                console.log(err);
                return res.json({ success: false, message: 'That email address already exists.' });
            }
            res.json({ success: true, message: 'Successfully created new user.' });
        });

    }
});

module.exports = router;