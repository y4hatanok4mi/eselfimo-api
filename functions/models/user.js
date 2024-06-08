const mongoose = require("mongoose");
const userSchema = require("../schema/user");
const taskSchema = require("../schema/task");

const userModel = mongoose.model("User", userSchema);
const taskModel = mongoose.model("Task", taskSchema);

module.exports = userModel;
module.exports = taskModel;