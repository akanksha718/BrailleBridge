# BrailleBridge 🌉

AI-powered Braille Translator for Educational Material - Breaking educational barriers for visually impaired individuals.

## Features ✨

- 📝 **Text to Braille**: Convert any text to braille format (.brf file)
- 🖼️ **Image to Braille**: Extract text from images using OCR and convert to braille
- 📄 **PDF to Braille**: Process PDF documents and convert content to braille
- 🔄 **Braille to Text**: Convert braille back to readable text
- 💬 **WhatsApp-like Interface**: User-friendly chat interface with message history
- 📥 **Download .brf Files**: Download converted braille in standard .brf format
- 💾 **Local History**: Chat history saved in browser local storage

## Tech Stack 🛠️

- **Frontend**: React, Redux, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Python Service**: Flask for braille conversion
- **Storage**: Firebase (optional)
- **Real-time**: Socket.io

## Project Structure 📁

```
BrailleBridge/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── config/     # Configuration files
│   │   └── store/      # Redux store
├── server/             # Node.js backend
│   ├── controllers/    # Business logic
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   └── sockets/        # Socket.io handlers
├── processor/          # Python service
│   ├── braille_converter.py  # Braille conversion logic
│   ├── app.py         # Flask API server
│   └── requirements.txt
└── README.md
```

## Setup Instructions 🚀

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Python 3.8+
- Tesseract OCR (for image recognition)

### 1. Clone the Repository

```bash
git clone https://github.com/akanksha718/BrailleBridge.git
cd BrailleBridge
```

### 2. Install Tesseract OCR

**Windows:**
- Download from: https://github.com/UB-Mannheim/tesseract/wiki
- Install and add to PATH

**Mac:**
```bash
brew install tesseract
```

**Linux:**
```bash
sudo apt-get install tesseract-ocr
```

### 3. Setup Backend Server

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/braillebridge
JWT_SECRET=your_jwt_secret_key
PYTHON_SERVICE_URL=http://localhost:5001
```

Start the server:
```bash
npm run dev
```

### 4. Setup Python Service

```bash
cd processor
pip install -r requirements.txt
pip install flask flask-cors
```

Run the Python service:
```bash
python app.py
```

### 5. Setup Frontend

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory (optional, for Firebase):
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
# ... other Firebase config
```

Start the frontend:
```bash
npm run dev
```

## Usage 📖

1. Start all services (backend, Python service, and frontend)
2. Open http://localhost:5173 in your browser
3. Sign up or log in to the application
4. Use the conversion page to:
   - Type text and convert to braille
   - Upload images for OCR and braille conversion
   - Upload PDFs for text extraction and braille conversion
5. View your conversion history in the chat-like interface
6. Download .brf files for offline use

## API Endpoints 🔌

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Braille Conversion
- `POST /api/braille/text-to-braille` - Convert text to braille
- `POST /api/braille/braille-to-text` - Convert braille to text
- `POST /api/braille/image-to-braille` - Convert image to braille
- `POST /api/braille/pdf-to-braille` - Convert PDF to braille
- `POST /api/braille/download-brf` - Download braille as .brf file

### Messages
- `GET /api/messages/:userId` - Get user's message history
- `POST /api/messages/upload` - Upload file

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the ISC License.

## Team 👥

- Akanksha Negi - Project Lead

## Support 💬

For issues, questions, or contributions, please open an issue on GitHub.

## Roadmap 🗺️

- [ ] Multi-language support
- [ ] Audio conversion (text-to-speech)
- [ ] Mobile app version
- [ ] Advanced braille formatting options
- [ ] Cloud storage integration for file management
