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

function testFunction() {
    var emailList = getUsers();
    console.log("test function: " + emailList);
    for(var i = 0; i < emailList.length; i++) {
        const options = {
            from: "HHM-RMSM@outlook.com",
            to: emailList[i],
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

        console.log("Email sent to: " + emailList[i]);
    }
    
}

function goodMorning() {

}

function goodEvening() {

}


function init() {
    //Runs at 8AM every day
    schedule.scheduleJob('0 8 * * *', goodMorning);

    //runs at 6PM every day
    schedule.scheduleJob('0 18 * * *', goodEvening);

    //runs every minute
    schedule.scheduleJob('* * * * *',getUsers);
}


async function getUsers() {
        var result = await User.find({notify:true})
        var userList = [];
        for(var i = 0; i < result.length;i++) {
            userList.push(result[i].email);
        }
        console.log("getUser: " + userList);

    for(var i = 0; i < userList.length; i++) {
        const options = {
            from: "HHM-RMSM@outlook.com",
            to: userList[i],
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

        console.log("Email sent to: " + userList[i]);
    }
    }