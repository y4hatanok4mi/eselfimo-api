const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", function (next) {
    const username = this.name.toLowerCase().replace(/\s/g, "");
    this.username = username;
    next();
  });

module.exports = userSchema;
