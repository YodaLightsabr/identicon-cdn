import crypto from 'crypto';
import Identicon from 'identicon.js';

export default function handler(request, response) {
    const { username } = request.query;
    const hash = crypto.createHash('sha256').update(username).digest('hex');
    const data = new Identicon(hash, 256).toString();
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