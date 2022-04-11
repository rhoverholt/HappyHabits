const { Schema } = require("mongoose");

const taskInstanceSchema = new Schema({
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = taskInstanceSchema;
