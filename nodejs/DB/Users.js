const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: {
    type: String,
  },
});
module.exports = Users = mongoose.model("user", user);
