# BrailleBridge Setup Guide

Follow these steps to set up the BrailleBridge application on your local machine.

## Prerequisites

- Node.js (v16 or higher) - [Download](https://nodejs.org/)
- MongoDB - [Download](https://www.mongodb.com/try/download/community)
- Python 3.8+ - [Download](https://www.python.org/downloads/)
- Tesseract OCR - Installation instructions below

### Install Tesseract OCR

**Windows:**
1. Download from: https://github.com/UB-Mannheim/tesseract/wiki
2. Run the installer
3. Add Tesseract to your PATH environment variable
4. Default installation path: `C:\Program Files\Tesseract-OCR\tesseract.exe`

**Mac:**
```bash
brew install tesseract
```

**Linux:**
```bash
sudo apt-get update
sudo apt-get install tesseract-ocr libtesseract-dev
```

## Installation Steps

### 1. Clone or Navigate to the Project

```bash
cd BrailleBridge
```

### 2. Setup Backend (Node.js)

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/braillebridge
JWT_SECRET=your_random_secret_key_here_make_it_long_and_random
PYTHON_SERVICE_URL=http://localhost:5001
```

### 3. Setup Python Service

```bash
cd ../processor
pip install -r requirements.txt
pip install flask flask-cors PyPDF2 pdf2image
```

Optional: If Tesseract is not in your PATH, update `braille_converter.py`:
```python
import pytesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
# Or your custom installation path
```

### 4. Setup Frontend (React)

```bash
cd ../client
npm install
```

Optional: For Firebase integration, create a `.env` file in the `client` folder:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Running the Application

You need to run three services simultaneously. Open three terminal windows:

### Terminal 1 - Backend Server
```bash
cd server
npm run dev
```
Server runs on: http://localhost:5000

### Terminal 2 - Python Service
```bash
cd processor
python app.py
```
Python API runs on: http://localhost:5001

### Terminal 3 - Frontend
```bash
cd client
npm run dev
```
Frontend runs on: http://localhost:5173

## Verify Setup

1. Open http://localhost:5173 in your browser
2. You should see the login/signup page
3. Create an account
4. Try converting some text to braille

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check if MongoDB is installed: `mongod --version`
- On Windows, MongoDB might be running as a service automatically
- On Mac/Linux: `sudo systemctl start mongodb` or `brew services start mongodb`

### Python Service Not Working
- Verify Tesseract is installed: `tesseract --version`
- Check if port 5001 is available
- Install missing Python packages

### OCR Not Working
- Verify Tesseract installation
- Check Tesseract path in `braille_converter.py`
- Test OCR: `tesseract image.png output -l eng`

### Frontend Not Loading
- Check if Node modules are installed
- Clear cache: `npm cache clean --force`
- Reinstall: `rm -rf node_modules && npm install`

## Production Deployment

### Environment Variables
- Set `NODE_ENV=production`
- Use secure JWT secret
- Configure MongoDB connection string
- Set up proper CORS origins

### Python Service
- Use WSGI server like Gunicorn for production
- Set up proper error logging
- Configure file size limits

### Frontend
- Build the frontend: `npm run build`
- Deploy to hosting service (Vercel, Netlify, etc.)

## Support

For issues or questions, please open an issue on GitHub.


