const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Server } = require("socket.io");
const messageRoutes = require("./routes/message/message-routes");
const authRoutes = require('./routes/auth/auth-routes');
const brailleRoutes = require('./routes/braille/braille-routes');
const socketHandler = require("./sockets/socketHandler");
require('dotenv').config();

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: ['http://localhost:5173', 'http://localhost:3000', 'file://', 'null'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true,
    })
);
const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use('/api/auth', authRoutes);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
// Simple test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'BrailleBridge API Server', 
        endpoints: {
            health: '/health',
            braille: '/api/braille/text-to-braille'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'BrailleBridge API' });
});

app.use("/api/messages", messageRoutes);
app.use("/api/braille", brailleRoutes);
socketHandler(io);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});