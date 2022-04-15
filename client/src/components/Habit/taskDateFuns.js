const mSecondsPerDay = 1000 * 60 * 60 * 24; // milliseconds per day

function cleanDate(dateTime) {
  let d = typeof dateTime === Object ? dateTime : new Date(parseInt(dateTime));

  return new Date(d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear()); // convert input date-time to a simple date with no time
}

function getWeeklyInstanceArray(dateTime) {
  const date = cleanDate(dateTime);

  const sunday = new Date(date - date.getDay() * mSecondsPerDay);

  return ["S", "M", "Tu", "W", "Th", "F", "Sa"].map((dow, index) => {
    return { dow, date: new Date(sunday - -index * mSecondsPerDay) };
  });
}

function getWeekSunday(dt = Date.now()) {
  dt = cleanDate(dt);
  dt = new Date(dt - dt.getDay() * mSecondsPerDay);
  return dt.getTime();
}

function isComplete(taskInterfaces, date) {
  return taskInterfaces.some(
    // if a date-match exists, return true
    (ti) => cleanDate(ti.dueDate).toString() === date.toString()
  );
}

function getCountActiveTasks(task, sunday) {
  if (!task.taskInstances) return 0;
  return task.taskInstances.reduce(
    (prev, curr) =>
      prev +
      (curr.dueDate >= sunday && curr.dueDate < sunday + 7 * mSecondsPerDay
        ? 1
        : 0),
    0
  );
}

module.exports = {
  mSecondsPerDay,
  getWeekSunday,
  cleanDate,
  getWeeklyInstanceArray,
  isComplete,
  getCountActiveTasks,
};
