const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth/auth-routes');
require('dotenv').config();

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: 'http://localhost:5173',
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
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});