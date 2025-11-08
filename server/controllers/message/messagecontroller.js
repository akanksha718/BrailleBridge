const Message = require("../../models/message");
const path = require("path");

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({ senderId: userId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const { userId, type } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;

    const message = await Message.create({
      senderId: userId,
      type,
      fileUrl,
      message: `Uploaded a ${type} file`,
    });

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Error uploading file" });
  }
};
