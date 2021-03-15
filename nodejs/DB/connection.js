const mongoose = require("mongoose");

const URI = "mongodb+srv://test:test@todo.0ytck.mongodb.net/chats";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Mongo connected");
};
module.exports = connectDB;
