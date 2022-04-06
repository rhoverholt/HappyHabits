const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "HHM-RMSM@outlook.com",
        pass: "PassWord123!@#"
    }
});

const options = {
    from: "HHM-RMSM@outlook.com",
    to: "mkang987@gmail.com",
    subject: "Your daily habit tasks!",
    text: "Testing this shizzelll"
};

transporter.sendMail(options, function(err ,info) {
    if(err) {
        console.log(err);
        return;
    }
    console.log(info.response);
});