const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
 
 Title:String,
 Description:String,
 Body:String,
 Upcoming:Boolean,
 Date:Date,

  
});

module.exports = mongoose.model("Events", EventSchema);