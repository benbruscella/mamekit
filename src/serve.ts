// Tiny zero-dependency static file server for out/<game>/ (and roms/).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, normalize, extname } from 'node:path';

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.zip': 'application/zip',
  '.wasm': 'application/wasm',
  '.cypher': 'text/plain; charset=utf-8',
};

export function serve(rootDirs: Record<string, string>, port: number): Promise<number> {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? '/', 'http://localhost');
      let path = normalize(decodeURIComponent(url.pathname)).replace(/^\/+/, '');
      if (path.includes('..')) { res.writeHead(403).end(); return; }
      // route by first segment if it names a mount, else default mount ''
      const [head, ...rest] = path.split('/');
      let root = rootDirs[''];
      if (head in rootDirs) { root = rootDirs[head]; path = rest.join('/'); }
      if (!path) path = 'index.html';
      let file = join(root, path);
      const s = await stat(file).catch(() => null);
      if (s?.isDirectory()) file = join(file, 'index.html');
      const body = await readFile(file);
      res.writeHead(200, {
        'content-type': MIME[extname(file)] ?? 'application/octet-stream',
        'cache-control': 'no-store',
      });
      res.end(body);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' }).end('not found');
    }
  });
  return new Promise(resolvePort => {
    server.listen(port, () => {
      const addr = server.address();
      resolvePort(typeof addr === 'object' && addr ? addr.port : port);
    });
  });
}
