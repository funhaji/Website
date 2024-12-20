let keys = [];
let lastGenerated = null;
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
function generateKeys() {
    keys = [];
    for (let i = 0; i < 24; i++) {
        keys.push(generateKey());
    }
    lastGenerated = new Date().getTime();  // Store the time the keys were generated
}

// Function to check if 24 hours have passed since the last key generation
function shouldRegenerateKeys() {
    if (!lastGenerated) return true;
    const currentTime = new Date().getTime();
    const hoursPassed = (currentTime - lastGenerated) / (1000 * 60 * 60); // Convert to hours
    return hoursPassed >= 24;  // Regenerate keys if more than 24 hours have passed
}

export default function handler(req, res) {
    // Regenerate keys if more than 24 hours have passed or if no keys were generated yet
    if (!keys.length || shouldRegenerateKeys()) {
        generateKeys();  // Regenerate keys
    }

    // Allow all origins for CORS
    res.setHeader('Access-Control-Allow-Origin', '*');  // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');  // Allow all methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');  // Allow all headers

    // Handle preflight (OPTIONS) request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Send the keys as a response
    res.status(200).json({ keys });
}
