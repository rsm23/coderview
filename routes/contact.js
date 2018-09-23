const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const config = require('../config');
const transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.route('/')
    .get((req, res, next) => {
        res.render("contact", {title : "CoderView | Contact Page"})
    })
    .post((req, res, next) => {
        let mailOptions = {
            from : 'Codereview <no-reply@codereview.com>',
            to : 'cool2309@gmail.com',
            subject : 'You\'ve got a new message from a visitor',
            text : req.body.message
        };
        transporter.sendMail(mailOptions,(error, info) => {
            if (error) {
                res.send(error);
            }
            res.send('Email has been sent');
        });
    });

module.exports = router;
