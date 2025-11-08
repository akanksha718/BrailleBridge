const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
    convertTextToBraille,
    convertBrailleToText,
    convertImageToBraille,
    convertPDFToBraille,
    downloadBRF
} = require('../../controllers/braille/braille-controller');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Braille conversion routes
router.post('/text-to-braille', convertTextToBraille);
router.post('/braille-to-text', convertBrailleToText);
router.post('/image-to-braille', upload.single('file'), convertImageToBraille);
router.post('/pdf-to-braille', upload.single('file'), convertPDFToBraille);
router.post('/download-brf', downloadBRF);

module.exports = router;


