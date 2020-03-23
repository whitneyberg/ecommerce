const express = require('express');
const nodemailer = require('nodemailer');
const contactMailer = express.Router();

contactMailer.post('/contact', (req, res) => {
    let { firstName, lastName, company, email, subject, message } = req.body;
    let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            },
    });

    let mailOptions = {
        from: `${firstName} ${lastName}`,
        to: `whitneywilcken3@gmail.com`,
        subject: `${subject}`,
        html:`
            <h4 style="margin:0px;">${firstName} ${lastName}</h4>
            <h4 style="margin:0px;">${company}</h4>
            <h4 style="margin:0px;">${email}</h4>
            <p>${message}</p>
        `
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            return console.log(err);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    });
})

module.exports = contactMailer;