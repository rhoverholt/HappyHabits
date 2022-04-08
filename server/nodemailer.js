require('dotenv').config();

const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const EMAIL = process.env.MAILER_EMAIL;
const PW = process.env.MAILER_PASSWORD;

//email account info
console.log(EMAIL);
const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: EMAIL,
        pass: PW
    }
});

// function testFunction() {
//     schedule.scheduleJob('* /5 * * * *', () => {
//         const options = {
//             from: "HHM-RMSM@outlook.com",
//             to: "mkang987@gmail.com",
//             subject: "5 minute email reminder",
//             text: "it has been 5 minutes"
//         };
    
//         transporter.sendMail(options, function(err ,info) {
//             if(err) {
//                 console.log(err);
//                 return;
//             }
//             console.log(info.response);
//         });
//     })
// };

function testFunction() {
    console.log('EMAIL SENT, i hope.');
    // const transporter = nodemailer.createTransport({
    //     service: "hotmail",
    //     auth: {
    //         user: EMAIL,
    //         pass: PW
    //     }
    // });
    const options = {
        from: "HHM-RMSM@outlook.com",
        to: "mkang987@gmail.com",
        subject: "Your daily habit tasks!",
        text: "good morning loser"
    };

    transporter.sendMail(options, function(err ,info) {
        if(err) {
            console.log(err);
            return;
        }
        console.log(info.response);
    });
}

schedule.scheduleJob('5 * * * * *',testFunction);
// //email information
// const options = {
//     from: "HHM-RMSM@outlook.com",
//     to: "mkang987@gmail.com",
//     subject: "Your daily habit tasks!",
//     text: "testing ENV"
// };

//sends initial email in morning
// schedule.scheduleJob('* 8 * * *', () => {
//     const options = {
//         from: "HHM-RMSM@outlook.com",
//         to: "mkang987@gmail.com",
//         subject: "Your daily habit tasks!",
//         text: "good morning loser"
//     };

//     transporter.sendMail(options, function(err ,info) {
//         if(err) {
//             console.log(err);
//             return;
//         }
//         console.log(info.response);
//     });
// })


// //sends the email and console logs it
// transporter.sendMail(options, function(err ,info) {
//     if(err) {
//         console.log(err);
//         return;
//     }
//     console.log(info.response);
// });
