// api/get-keys.js
export default function handler(req, res) {
    const keys = ["key1", "key2", "key3"];  // Replace this with your key generation logic
    res.status(200).json({ keys });
  }
  