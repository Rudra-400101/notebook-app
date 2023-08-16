const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // we are store user id for matching user
    ref:'user'
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  tag: {
    type: String,
    default: "general",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userNotes = mongoose.model("bookdatas", userSchema);
module.exports = userNotes;
