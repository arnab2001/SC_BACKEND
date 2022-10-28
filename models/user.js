const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
  
});

module.exports = mongoose.model("Users", UserSchema);