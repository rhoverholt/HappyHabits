const nodemailer = require('nodemailer');
require('dotenv').config();
const EMAIL = process.env.MAILER_EMAIL;
const PW = process.env.MAILER_PASSWORD;

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: EMAIL,
        pass: PW
    }
});

var useremail = "getcurrent email";

const options = {
    from: "HHM-RMSM@outlook.com",
    to: "mkang987@gmail.com",
    subject: "Your daily habit tasks!",
    text: "testing ENV"
};

transporter.sendMail(options, function(err ,info) {
    if(err) {
        console.log(err);
        return;
    }
    console.log(info.response);
});