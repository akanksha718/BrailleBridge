const Message = require("../models/message");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    socket.on("send_message", async (data) => {
      const newMessage = await Message.create(data);
      io.to(data.senderId).emit("receive_message", newMessage);
    });

    socket.on("disconnect", () => console.log("🔴 User disconnected"));
  });
};

