const mongoose = require("mongoose");
const taskSchema = require("../schema/task");

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;