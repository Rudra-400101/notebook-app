const mongoose = require("mongoose");
const {Schema}=mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    index:true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: new Date().toGMTString(),
  },
});


const userModel=mongoose.model("userdatas", userSchema);


module.exports = userModel
