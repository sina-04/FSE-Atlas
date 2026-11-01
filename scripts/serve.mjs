import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('out');
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '/FSE-Atlas';
const port = Number(process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.mp3': 'audio/mpeg',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      if (prefix && pathname !== prefix && !pathname.startsWith(prefix + '/'))
        throw new Error('404');
      const relative = pathname.slice(prefix.length);
      let target = path.resolve(root, '.' + relative);
      if (target !== root && !target.startsWith(root + path.sep)) throw new Error('404');
      let stat = await fs.stat(target);
      if (stat.isDirectory()) {
        target = path.join(target, 'index.html');
        stat = await fs.stat(target);
      }
      const body = await fs.readFile(target);
      res.writeHead(200, {
        'Content-Type': types[path.extname(target)] || 'application/octet-stream',
        'Content-Length': stat.size,
      });
      res.end(body);
    } catch {
      const body = await fs
        .readFile(path.join(root, '404.html'))
        .catch(() => Buffer.from('Not found'));
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(body);
    }
  })
  .listen(port, '127.0.0.1', () =>
    console.log(`Static export: http://127.0.0.1:${port}${prefix}/`),
  );
