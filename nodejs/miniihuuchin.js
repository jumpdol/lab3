const mongo = require("mongodb");
const client = require("socket.io")(4000);
var cors = require("cors");
var express = require("express");

var app = express();

app.use(cors());

app.listen(4001, function () {
  console.log("CORS-enabled web server listening on port 80");
});
mongo.connect(
  "mongodb+srv://test:test@todo.0ytck.mongodb.net/chats",
  (err, db) => {
    if (err) {
      throw err;
    }
    console.log("Mongo connected");
    client.on("connection", (socket) => {
      let chat = db.collection("myChat");
      //   client.on("event", (data) => {});
      //   client.on("disconnect", () => {});
      sendStatus = function (s) {
        client.emit("status", s);
      };
      // Get chats from MongoDB
      chat
        .find()
        .limit.sort({ _id: 1 })
        .toArray(function (err, res) {
          if (err) throw err;
          socket.emit("output", res);
        });
      socket.on("input", (data) => {
        let name = data.name;
        let message = data.message;

        if (name == "" || message == "") {
          // Send error
          sendStatus("PLease enter a name and message");
        } else {
          chat.insert({ name: name, message: message }, () => {
            client.emit("output", [data]);
            // Send status object
            sendStatus({
              message: "Message sent",
              clear: true,
            });
          });
        }
      });
      socket.on("clear", (data) => {
        // Remove all chats from collection
        chat.remove({}, () => {
          socket.emit("cleared");
        });
      });
    });
  }
);
