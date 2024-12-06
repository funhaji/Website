import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import schedule from 'node-schedule';

// Initialize express app
const app = express();
const PORT = process.env.PORT || 4000;

// Store keys in memory
let keys = [];

// Function to generate a random key
function generateKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < 16; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}

// Function to generate 24 keys every 24 hours
function generateDailyKeys() {
    keys = []; // Clear old keys
    for (let i = 0; i < 24; i++) {
        keys.push(generateKey()); // Generate and store 24 keys
    }
    console.log('New keys generated');
}

// Set a job to run every 24 hours
schedule.scheduleJob('0 0 * * *', generateDailyKeys); // This will run at midnight every day

// Generate keys immediately when the server starts
generateDailyKeys();

// CORS configuration
const corsOptions = {
    origin: '*', // Allow requests from any origin (for testing, change this later)
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// Middleware to handle CORS
app.use(cors(corsOptions));

// Endpoint to fetch the generated keys
app.get('/get-keys', (req, res) => {
    res.json({ keys });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
