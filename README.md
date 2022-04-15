# HappyHabits
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description
It is not always easy to build a new habit, and actually stick to it.  Often times we take on more than we can handle and end up throwing in the towel before making meaningful progress.  That is why with ***Happy Habits*** we aim to set our habit-builders up for success.  Our application allows users to create habits, break them down into achievable tasks, and track their progress along their journey to build better habits.  Little changes that add up to ***BIG*** results.


Highlights for this project:
- Sign up/ Log in for users

- User specific dashboard including all habits user has created and the associated tasks

- Ability for users to create and update habits and tasks details

- Add notes so users can comment on their own habit progress

- Email notifications

- Visualization of metrics using ChartJS

Technologies Used:
* React for the front end

* GraphQL with a Node.js and Express.js server

* MongoDB and the Mongoose ODM for the database

* Queries and mutations for retrieving, adding, updating, and deleting data

* User authentication with JWT

* Heroku for the deployed application



## Table of Contents
- [User Story](#user-story)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Deployed Application](#deployed-application)
- [Questions](#questions)

## User-Story

```md
As a self-improving person, I want an application where…

I can identify desired habits
I can create tasks to achieve the habits
I can track my progress and add comments for these habits

So that I become more effective in developing habits that stick.
```
## Installation
To use this code as your own you will need to install Node.js and install NPM package dependencies. You will need to sign up with MongoDB and install the MongoDB Compass.  

You will need to set up your own .env file to store connection details.  Consider creating .gitignore file and include .env file node_modules so that your information is not tracked or uploaded to a repository in the future. Be sure to create your .gitignore file before installing any npm dependencies.


## Usage
First time users will be prompted to sign up and create a Happy Habits account.  Returning users can log in to see their habits.
![Login/Sign up page]()

On the dashboard page, users can see their current habits and associated tasks.  Users will be able to mark whether they have completed a task for a given day.  Additionally, users will have their metrics on task completion shown neatly in their dashboard.  If a user wants to create a new Habit, they can click the 'Create Habit' button at the top of the page, or to edit an existing habit they can click on individual habit titles.
![Dashboard]()

On the create Habit page, users will be prompted to enter a habit title and can include any notes about the habit.  
![Create Habit]()

After saving the habit, the user will be prompted to add tasks to the habit.  If users need to update or delete a task they can do so on the same page.
![Add Task]()
![Update Task]()

Additionally, users will receive email notifications to remind them to log in to Happy Habits to update their tasks.
![Email Notification]()


## License
This application is covered under the [License: MIT](https://opensource.org/licenses/MIT).


## Contributing
Happy Habits was built with ❤️, ☕️, and 🦾 by this team:
* [Rich](https://github.com/rhoverholt)

* [Sarah](https://github.com/SarahLabrotLientz)

* [Alex](https://github.com/mkang987)

* [Melissa](https://github.com/mel-ificent)


## Tests
No test scripts for this application.


## Deployed Application
[Link to the Deployed Application](https://hello-happy-habits.herokuapp.com)

## Questions
Questions? Reach out to the Happy Habits team!  Contact details provided on each contributor's profile page.