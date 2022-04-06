const { Schema } = require("mongoose");
const { taskSchema } = require("./Tasks");

const taskSchema = new Schema({
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = taskSchema;
