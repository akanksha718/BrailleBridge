# BrailleBridge Quick Start Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
# Install Node.js dependencies
cd BrailleBridge/server && npm install
cd ../client && npm install

# Install Python dependencies
cd ../processor
pip install -r requirements.txt flask flask-cors PyPDF2 pdf2image Pillow pytesseract
```

### Step 2: Setup Environment

Create `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/braillebridge
JWT_SECRET=change_this_to_a_random_string
PYTHON_SERVICE_URL=http://localhost:5001
```

### Step 3: Start Services

**Windows:**
```bash
start-dev.bat
```

**Mac/Linux:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Or manually (in 3 separate terminals):**
```bash
# Terminal 1
cd processor && python app.py

# Terminal 2
cd server && npm run dev

# Terminal 3
cd client && npm run dev
```

## 🌐 Access the Application

Open http://localhost:5173 in your browser.

## 📝 Basic Usage

1. **Sign Up/Login**: Create an account or log in
2. **Navigate to Conversion**: Use the conversion page
3. **Send Text**: Type any text and press Send or Enter
4. **Upload Image**: Click "Upload Image" to convert image text to braille
5. **Upload PDF**: Click "Upload PDF" to convert PDF text to braille
6. **Download**: Click "Download .brf" button to download braille file

## 🎯 Key Features

- ✉️ **Text to Braille**: Direct text conversion
- 🖼️ **OCR from Images**: Extract and convert text from images
- 📄 **PDF Processing**: Extract and convert PDF content
- 💾 **Download .brf Files**: Standard braille file format
- 💬 **Chat History**: All conversions saved locally
- 🔄 **Reverse Conversion**: Braille back to text

## 🛠️ Troubleshooting

**MongoDB not running?**
```bash
# Mac/Linux
brew services start mongodb

# Windows - MongoDB usually runs as a service
# Check Services in Task Manager
```

**Python service not working?**
```bash
# Check if port 5001 is in use
lsof -i :5001  # Mac/Linux
netstat -ano | findstr :5001  # Windows
```

**OCR not working?**
- Install Tesseract OCR (see SETUP.md)
- Verify: `tesseract --version`

## 📚 More Information

- Detailed setup: See `SETUP.md`
- Full documentation: See `README.md`
- Python service docs: See `processor/README.md`

## 🎓 Example Conversions

**Text:**
```
Input: "Hello World"
Output: ⠓⠑⠇⠇⠕ ⠺⠕⠗⠇⠙
```

**Send via:**
- Type in text box and press Send
- Upload image containing "Hello World"
- Upload PDF containing "Hello World"


