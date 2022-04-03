import crypto from 'crypto';
import Identicon from 'identicon.js';

export default function handler(request, response) {
    const { username } = request.query;
    let size = 256;
    if (username.includes('::size::80::')) size = 80;
    const hash = crypto.createHash('sha256').update(username).digest('hex');
    const data = new Identicon(hash, size).toString();
    const image = Buffer.from(data, 'base64');
    response.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': image.length,
        'Access-Control-Allow-Origin': '*',
        'Age': '8943809',
        'Cache-Control': 'public, max-age=0, must-revalidate'
    });
    response.end(image);
}