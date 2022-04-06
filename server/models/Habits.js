const { Schema } = require("mongoose");
const { taskSchema } = require("./Tasks");

const habitSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    unique: true,
  },
  notes: {
    type: String,
    required: true,
    minlength: 5,
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