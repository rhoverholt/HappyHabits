const { Schema } = require("mongoose");
const { taskSchema } = require("./Tasks");

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  frequency: {
    type: String,
    required: true,
    unique: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },

});

module.exports = taskSchema;
