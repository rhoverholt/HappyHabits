const db = require("../config/connection");
const { User } = require("../models");
let userSeeds = require("./userSeeds.json");

function jsonDateHandler(userSeeds) {
  userSeeds.forEach((user) =>
    user.habits?.forEach((habit) => {
      habit.createdDate = habit.createdDate
        ? new Date(habit.createdDate)
        : undefined;
      habit.completedDate = habit.completedDate
        ? new Date(habit.completedDate)
        : undefined;
      habit.tasks?.forEach((task) => {
        task.startDate = task.startDate ? new Date(task.startDate) : undefined;
        task.endDate = task.endDate ? new Date(task.endDate) : undefined;
        task.taskInstances?.forEach((tInstance) => {
          tInstance.dueDate = tInstance.dueDate
            ? new Date(tInstance.dueDate)
            : undefined;
          return tInstance;
        });
        return task;
      });
      return habit;
    })
  );
  return userSeeds;
}

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.create(jsonDateHandler(userSeeds));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
