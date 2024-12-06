export default function handler(req, res) {
    const keys = [];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Function to generate a random key
    function generateKey() {
        let key = '';
        for (let i = 0; i < 16; i++) {
            key += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return key;
    }

    // Generate 24 keys
    for (let i = 0; i < 24; i++) {
        keys.push(generateKey());
    }

    // CORS headers to allow all origins, methods, and headers
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
