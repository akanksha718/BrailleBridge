# BrailleBridge Installation Guide

Complete step-by-step guide to install and run BrailleBridge on your system.

## System Requirements

- **Operating System**: Windows, MacOS, or Linux
- **Node.js**: v16 or higher ([Download](https://nodejs.org/))
- **Python**: 3.8 or higher ([Download](https://www.python.org/downloads/))
- **MongoDB**: Latest version ([Download](https://www.mongodb.com/try/download/community))
- **Git**: Optional, for cloning ([Download](https://git-scm.com/))

## Installation Steps

### 1. Install MongoDB

#### Windows
1. Download MongoDB from: https://www.mongodb.com/try/download/community
2. Run the installer (MSI)
3. Choose "Complete" installation
4. Install as Windows Service (recommended)
5. MongoDB will auto-start as a service

#### Mac
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian)
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### 2. Install Tesseract OCR

#### Windows
1. Download from: https://github.com/UB-Mannheim/tesseract/wiki
2. Run installer (e.g., `tesseract-ocr-w64-setup-v5.x.x.exe`)
3. Default path: `C:\Program Files\Tesseract-OCR\tesseract.exe`
4. Add to PATH (or note the path for later configuration)

#### Mac
```bash
brew install tesseract
```

#### Linux
```bash
sudo apt-get update
sudo apt-get install tesseract-ocr libtesseract-dev
```

**Verify Tesseract installation:**
```bash
tesseract --version
```

### 3. Install Python Dependencies

```bash
# Navigate to processor directory
cd BrailleBridge/processor

# Install Python packages
pip install -r requirements.txt
pip install flask flask-cors PyPDF2 pdf2image Pillow pytesseract

# Verify installation
python -c "import flask; import pytesseract; print('Python dependencies installed successfully!')"
```

**If you get permission errors on Mac/Linux:**
```bash
pip install --user -r requirements.txt flask flask-cors PyPDF2 pdf2image Pillow pytesseract
```

### 4. Install Node.js Dependencies

```bash
# Backend dependencies
cd BrailleBridge/server
npm install

# Frontend dependencies
cd ../client
npm install
```

### 5. Configure Environment Variables

#### Backend Configuration

Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/braillebridge
JWT_SECRET=change_this_to_a_long_random_string_12345
PYTHON_SERVICE_URL=http://localhost:5001
```

**Generate a secure JWT secret:**
```bash
# On Unix/Mac/Linux
openssl rand -base64 32

# On Windows (PowerShell)
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

#### Optional: Python Service Configuration

If Tesseract is not in your PATH, create `processor/.env`:
```env
TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
```

Or update `processor/braille_converter.py`:
```python
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
```

#### Optional: Frontend (Firebase) Configuration

Create `client/.env`:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Running the Application

### Option 1: Automated Start (Recommended)

#### Windows
```bash
start-dev.bat
```

#### Mac/Linux
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Option 2: Manual Start (3 Terminals)

#### Terminal 1 - Python Service
```bash
cd BrailleBridge/processor
python app.py
```
Expected output: `Running on http://0.0.0.0:5001`

#### Terminal 2 - Backend Server
```bash
cd BrailleBridge/server
npm run dev
```
Expected output: `Server is running on port 5000`

#### Terminal 3 - Frontend
```bash
cd BrailleBridge/client
npm run dev
```
Expected output: `Local: http://localhost:5173`

### Access the Application

Open your browser and go to: **http://localhost:5173**

## Verification Steps

### 1. Check MongoDB
```bash
# Should show MongoDB version
mongod --version

# Check if MongoDB is running
# Windows: Check Services in Task Manager for MongoDB
# Mac/Linux: brew services list | grep mongodb
```

### 2. Check Python Service
- Visit: http://localhost:5001/health
- Should return: `{"status": "healthy", "service": "Braille Converter API"}`

### 3. Check Backend Server
- Visit: http://localhost:5000 (or check terminal output)
- Should show server is running

### 4. Test the Application
1. Open http://localhost:5173
2. Sign up for a new account
3. Navigate to conversion page
4. Type "Hello World" and send
5. You should see braille output

## Troubleshooting

### Issue: MongoDB Connection Error

**Symptoms:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
```bash
# Start MongoDB service
# Windows: services.msc -> MongoDB -> Start
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Issue: Tesseract Not Found

**Symptoms:** `TesseractNotFoundError`

**Solution:**
1. Verify Tesseract is installed: `tesseract --version`
2. Add Tesseract to PATH or configure path in code
3. Update `braille_converter.py` with correct path

### Issue: Port Already in Use

**Symptoms:** `EADDRINUSE: address already in use`

**Solution:**
```bash
# Find process using port
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000

# Kill the process
# Windows: taskkill /PID <process_id> /F
# Mac/Linux: kill -9 <process_id>
```

### Issue: Python Dependencies Not Found

**Symptoms:** `ModuleNotFoundError`

**Solution:**
```bash
# Install all required packages
pip install Flask flask-cors Pillow pytesseract PyPDF2 pdf2image

# Or install requirements
pip install -r requirements.txt
```

### Issue: Frontend Not Loading

**Symptoms:** Blank page or connection errors

**Solution:**
1. Check that backend is running on port 5000
2. Check that Python service is running on port 5001
3. Clear browser cache
4. Check browser console for errors

### Issue: OCR Not Working

**Solution:**
1. Verify Tesseract installation
2. Check image quality (use clear, readable images)
3. Install language data if needed
4. Test with command line: `tesseract image.png output -l eng`

## Production Deployment

### Backend Deployment

1. Set environment variables
2. Use PM2 or similar process manager
3. Enable HTTPS
4. Configure MongoDB Atlas (cloud database)

### Python Service Deployment

1. Use Gunicorn or uWSGI
2. Set up reverse proxy (Nginx)
3. Configure SSL certificates

### Frontend Deployment

1. Build the frontend: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Configure API endpoints in environment variables

## Additional Resources

- MongoDB Documentation: https://docs.mongodb.com/
- Tesseract OCR: https://github.com/tesseract-ocr/tesseract
- Flask Documentation: https://flask.palletsprojects.com/
- React Documentation: https://react.dev/

## Support

If you encounter issues:
1. Check the error messages in terminal
2. Review SETUP.md for detailed troubleshooting
3. Check browser console for frontend errors
4. Open an issue on GitHub with:
   - Error message
   - Operating system
   - Steps to reproduce


