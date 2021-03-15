const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(":");
  // ...
  socket.on("main", (res) => {
    console.log(res);
    socket.emit("reschats", res);
  });
});
httpServer.listen(4000);
console.log("Server listening port 4000");
