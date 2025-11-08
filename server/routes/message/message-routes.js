const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getMessages, uploadFile } = require("../../controllers/message/messagecontroller");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get("/:userId", getMessages);
router.post("/upload", upload.single("file"), uploadFile);

module.exports = router;
