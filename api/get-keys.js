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

    // Set CORS headers to allow requests from your Netlify app
    res.setHeader('Access-Control-Allow-Origin', 'https://taxus.netlify.app'); // Allow Netlify origin
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Send the keys as a response
    res.status(200).json({ keys });
}
