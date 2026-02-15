require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const advisoryRoutes = require('./routes/advisory');
const weatherRoutes = require('./routes/weather');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/advisory', advisoryRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Smart Crop Advisory Backend is running.');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => console.log('MongoDB Connection Error:', err));

// Start Server Immediately
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
