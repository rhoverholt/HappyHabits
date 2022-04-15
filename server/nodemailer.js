const { Habits , TaskInstance, Tasks, User} = require('./models');
const db = require('./config/connection');
require('dotenv').config();

const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const EMAIL = process.env.MAILER_EMAIL;
const PW = process.env.MAILER_PASSWORD;


//email account info
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: PW
    }
});
console.log(`Using ${EMAIL} as default emailer`);

db.once('open', () => {
    init();
})


function init() {
    //Runs at 8AM every day
    schedule.scheduleJob('0 8 * * *', goodMorning);

    //runs at 6PM every day
    schedule.scheduleJob('0 18 * * *', goodEvening);

    //runs every minute for testing purposes.
    //schedule.scheduleJob('* * * * *',testFunction);
}

async function testFunction() {
    var allResults = await User.find({ notify: true });
    var userList = [];
    for(var l = 0; l < allResults.length; l++) {
        userList.push(allResults[l].email);
    }

    for(var i = 0; i < userList.length; i++) {
        var result = await User.find({ email: userList[i]});
        console.log(result);

        var habitsList = [];
        for(var h = 0; h < result[0].habits.length; h++) {
        habitsList.push(result[0].habits[h].title)
        }

        const options = {
                from: "HHM-RMSM@outlook.com",
                to: userList[i],
                subject: "Daily Tasks",
                    text: `Good morning!
                \r\nHere is a list of your habits you are working on!!
                \r\n-${habitsList.join("\r\n-")}
                \r\nYou can always check your full details at https://hello-happy-habits.herokuapp.com/`
            };
            
        transporter.sendMail(options, function(err ,info) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(info.response);
        });
        console.log("Email sent to: " + userList[i]);
    }

    // for(var i = 0; i < results.length; i++) {
    //     var habits = [];
    //     for(var h = 0; h < results[i].habits.length; h++) {
    //         habits.push(results[i].habits.title)
    //     }
    // }

    // for(var i = 0; i < userList.length; i++) {
    //     const options = {
    //         from: "HHM-RMSM@outlook.com",
    //         to: userList[i],
    //         subject: "Daily Daily Tasks",
    //         text: `Good morning!
    //         \r\nHere is a list of your habits you are working on!!
    //         \r\n-${habitsTitle.join("\r\n-")}
    //         \r\nYou can always check your full details at https://hello-happy-habits.herokuapp.com/`
    //     };
    
    //     transporter.sendMail(options, function(err ,info) {
    //         if(err) {
    //             console.log(err);
    //             return;
    //         }
    //         console.log(info.response);
    //     });
    //     setTimeout(() => {console.log("Email sent to: " + userList[i])}, 5000);
    // }
}

async function goodMorning() {
    var allResults = await User.find({ notify: true });
    var userList = [];
    for(var l = 0; l < allResults.length; l++) {
        userList.push(allResults[l].email);
    }

    for(var i = 0; i < userList.length; i++) {
        var result = await User.find({ email: userList[i]});
        console.log(result);

        var habitsList = [];
        for(var h = 0; h < result[0].habits.length; h++) {
        habitsList.push(result[0].habits[h].title)
        }

        const options = {
                from: "HHM-RMSM@outlook.com",
                to: userList[i],
                subject: "Daily Tasks",
                    text: `Good morning!
                \r\nHere is a list of your habits you are working on!!
                \r\n-${habitsList.join("\r\n-")}
                \r\nYou can always check your full details at https://hello-happy-habits.herokuapp.com/`
            };
            
        transporter.sendMail(options, function(err ,info) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(info.response);
        });
        console.log("Email sent to: " + userList[i]);
    }
}

async function goodEvening() {
    var results = await User.find({ notify: true });
    var userList = [];
    for(var l = 0; l < results.length; l++) {
        userList.push(results[l].email);
    }

    for(var i = 0; i < userList.length; i++) {
        const options = {
            from: "HHM-RMSM@outlook.com",
            to: userList[i],
            subject: "Daily Reminder!",
            text: "Just a daily reminder to log in and check off your daily tasks!"
        };
    
        transporter.sendMail(options, function(err ,info) {
            if(err) {
                console.log(err);
                return;
            }
            console.log(info.response);
        });

        console.log("Email sent to: " + userList[i]);
    }
}