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

    // Allow CORS from the Netlify domain
    res.setHeader('Access-Control-Allow-Origin', 'https://taxus.netlify.app');  // Allow your Netlify domain
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handling preflight (OPTIONS) request if needed
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Send the keys as a response
    res.status(200).json({ keys });
}
