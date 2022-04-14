const { Habits , TaskInstance, Tasks, User} = require('./models');
const db = require('./config/connection');
require('dotenv').config();

const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const EMAIL = process.env.MAILER_EMAIL;
const PW = process.env.MAILER_PASSWORD;


//email account info
const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: EMAIL,
        pass: PW
    }
});
console.log(EMAIL);

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
    var results = await User.find({ notify: true });
    var userList = [];
    var habitsResult= [];
    var habitsTitle = [];
    for(var l = 0; l < results.length; l++) {
        userList.push(results[l].email);
        habitsResult.push(results[l].habits);
    }
    console.log(habitsResult);

    for(var i = 0; i <= habitsResult.length; i++) {
        habitsTitle.push(habitsResult[0][i].title);
    }
    console.log(habitsTitle);

    for(var i = 0; i < userList.length; i++) {
        const options = {
            from: "HHM-RMSM@outlook.com",
            to: userList[i],
            subject: "Daily Daily Tasks",
            text: `Good morning!
            Here is a list of your daily tasks!
            - ${habitsTitle}`
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

async function goodMorning() {
    var results = await User.find({ notify: true });
    var userList = [];
    var habitsResult= [];
    var habitsTitle = [];
    for(var l = 0; l < results.length; l++) {
        userList.push(results[l].email);
        habitsResult.push(results[l].habits);
    }
    console.log(habitsResult);

    for(var i = 0; i <= habitsResult.length; i++) {
        habitsTitle.push(habitsResult[0][i].title);
    }
    console.log(habitsTitle);

    for(var i = 0; i < userList.length; i++) {
        const options = {
            from: "HHM-RMSM@outlook.com",
            to: userList[i],
            subject: "Daily Daily Tasks",
            text: `Good morning!
            Here is a list of your daily tasks!
            - ${habitsTitle}`
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
    console.log(results)

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
