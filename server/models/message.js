const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["pdf", "image", "text", "braille"], required: true },
  message: { type: String },
  fileUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
