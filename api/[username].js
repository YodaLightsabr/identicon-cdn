import crypto from 'crypto';
import Identicon from 'identicon.js';

export default function handler(request, response) {
    const { username } = request.query;
    const hash = crypto.createHash('sha256').update(username).digest('hex');
    const data = new Identicon(hash, 512).toString();
    const image = Buffer.from(data, 'base64');
    response.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': image.length
    });
    response.end(image);
}