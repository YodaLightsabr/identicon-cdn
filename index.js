const crypto = require('crypto');
const express = require('express');
const Identicon = require('identicon.js');

const PORT = process.env.PORT || process.env.port || 8080;

function generate (username) {
    const hash = crypto.createHash('sha256').update(username).digest('hex');
    const data = new Identicon(hash, 512).toString();
    return data;
}

const app = express();

app.get('/', (req, res) => {
    res.send('OK');
});

app.get('/username/:username', (req, res) => {
    const data = generate(req.params.username);
    const image = Buffer.from(data, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': image.length
    });
    res.end(image);
});

app.listen(PORT, () => {
    console.log('Ready on *:' + PORT);
});