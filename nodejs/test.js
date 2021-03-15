const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

http.listen(4000, function () {
  console.log("listening on port 4000");
});
const mongo = require("mongodb");

mongo.connect(
  "mongodb+srv://test:test@todo.0ytck.mongodb.net/chats",
  (err, db) => {
    if (err) {
      throw err;
    }
    let chat = db.collection("myChat");
    // io.on("connection", (socket) => {
    //   socket.on("message", ({ name, message }) => {
    //     io.emit("message", { name, message });
    //   });
    // });
  }
);
