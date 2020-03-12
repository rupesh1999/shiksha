const express = require("express");
const nodeMailer = require("nodemailer");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();

router.get("/reqpermission", passport.authenticate("jwt", { session: false }), (req, res) => {

    let transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: 'rs.rupesh95@gmail.com',
            pass: 'gokussj10'
        }
    });
    let mailOptions = {
        from: 'wc.shiksha@gmail.com', // sender address
        to: "rs.rupesh95@gmail.com", // list of receivers
        subject: "to grant permission to be a teacher", // Subject line
        html: `<a href = "http://localhost:3000/permissions/givepermission/${req.user.email}">Grant permission</a>` // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.json({
                success: false,
                msg: "your request was not processed due to some error"
            })
        } else {
            console.log('Email sent: ' + info.response);
            res.json({
                success: true,
                msg: "you have successfully requested to be a teacher"
            });
        }
    });

});

router.get("/givepermission/:email", (req, res) => {
    User.updateOne(
        { "email": req.params.email },
        { $set: { "role": "teacher" } }
    ).then(user => {
        console.log(user);
        res.json({
            success : true,
            msg : "successfully made a teacher"
        })
    }).catch(e => {
        console.log(e);
        res.json({
            success : false,
            msg : "error"
        });
    });
});

module.exports = router;