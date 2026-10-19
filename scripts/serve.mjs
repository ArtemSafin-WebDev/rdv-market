import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve(process.argv[2] || '.');
const requestedPort = Number(process.env.PORT || 4173);
if (!Number.isInteger(requestedPort) || requestedPort < 0 || requestedPort > 65535) {
  console.error('PORT должен быть целым числом от 0 до 65535.');
  process.exit(1);
}
let port = requestedPort;
const lastPort = Math.min(requestedPort + 20, 65535);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.mp4': 'video/mp4' };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); return res.end(); }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(body);
  } catch { res.writeHead(404); res.end('Not found'); }
});

server.on('error', error => {
  if (error.code === 'EADDRINUSE' && port < lastPort) {
    console.log(`Порт ${port} занят, пробую ${port + 1}…`);
    server.listen(++port, '127.0.0.1');
    return;
  }
  console.error(error.code === 'EADDRINUSE'
    ? 'Свободный порт не найден. Укажите другой: PORT=5000 npm run dev'
    : `Не удалось запустить сервер: ${error.message}`);
  process.exitCode = 1;
});
server.on('listening', () => {
  console.log(`\nRDV Маркет готов: http://127.0.0.1:${server.address().port}/\nОстановить сервер: Ctrl+C\n`);
});
server.listen(port, '127.0.0.1');
