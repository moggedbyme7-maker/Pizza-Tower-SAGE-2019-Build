import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'assets', 'game.unx');
  
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('game.unx not found');
  }

  const stat = fs.statSync(filePath);
  
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Encoding', 'identity');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
}