const express = require('express');
const router = express.Router();

let nodemailer = require('nodemailer');
let config = require('../config');
let transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.route('/')
    .get(function (req, res, next) {
        res.render("contact", {title : "CoderView | Contact Page"})
    })
    .post(function (req, res, next) {
        let mailOptions = {
            from : 'Codereview <no-reply@codereview.com>',
            to : 'cool2309@gmail.com',
            subject : 'You\'ve got a new message from a visitor',
            text : req.body.message
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.send(error);
            }
            res.send('Email has been sent');
        })
    });

module.exports = router;
