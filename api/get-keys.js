let keys = [];  // Store the keys in memory
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// Function to generate a random key
function generateKey() {
    let key = '';
    for (let i = 0; i < 16; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}

// Function to generate 24 keys
function generateDailyKeys() {
    keys = [];  // Clear old keys
    for (let i = 0; i < 24; i++) {
        keys.push(generateKey());  // Generate and store 24 keys
    }
    console.log('New keys generated');
}

// Generate keys immediately when the server starts
generateDailyKeys();

// Set an interval to regenerate keys every 24 hours
setInterval(generateDailyKeys, 24 * 60 * 60 * 1000);  // 24 hours in milliseconds

// API route to fetch the generated keys
export default function handler(req, res) {
    res.status(200).json({ keys });
}
