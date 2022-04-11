const { Schema } = require("mongoose");
const taskSchema = require("./Tasks");

const habitSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    default: `In Progress`,
  },
  notes: {
    type: String,
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  completedDate: {
    type: Date,
  },
  tasks: [taskSchema],
});

module.exports = habitSchema;
