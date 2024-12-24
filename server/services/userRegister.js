const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const nodeMailer = require('nodemailer')
const fs = require('fs');
const path = require('path');
require("dotenv").config()

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.jwt, {
        expiresIn: maxAge
    })
}

const sendMail = async (email,userName) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS
            }
        })

        const htmlFilePath = path.join(__dirname, '..', "assets", 'RegistrationEmail.html');

        let htmlContent = await fs.readFileSync(htmlFilePath, 'utf8');
        htmlContent = htmlContent.replace("[User's Name]", userName);
        htmlContent = htmlContent.replace("[Company Name]", "Stock App");

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: 'Registration Mail',
            text: 'Please find the attached file.',
            html: htmlContent,
            attachments: [
                {
                    filename: 'your-file.html',
                    path: htmlFilePath,
                },
            ],
        };



        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent successfully:', info.response);
            }
        });
        console.log(`Email has been sent to ${email}`)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports.userRegister = async (req, res, next) => {

    try {
        console.log(req.body)
        const { name, email, userName, phoneNumber, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

     
        const user = await userModel.create({ name, email, userName, phoneNumber, password })
        const token = createToken(user._id)
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        })
        sendMail(email, userName)
        res.status(201).json({ user: user._id, created: true })
    }
    catch (err) {
        console.log(err)
    }
}