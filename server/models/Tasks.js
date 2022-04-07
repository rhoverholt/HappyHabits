const { Schema } = require("mongoose");
const taskInstanceSchema = require("./TaskInstance");

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  taskInstances: [taskInstanceSchema],
});

module.exports = taskSchema;
