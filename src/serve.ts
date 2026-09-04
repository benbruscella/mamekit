// Tiny zero-dependency static file server for out/ (unified app + per-game
// data) and .data/roms/. Also serves /games.json — a live manifest of every
// generated game, for the boot menu.
import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, normalize, extname } from 'node:path';
import { buildClosureFailures, readBuildManifest } from './gen/build-manifest.ts';
import { ROM_BUCKET_BASE, encodeRomKey } from './runtime/rom-source.ts';
import {
  GAME_CATEGORIES,
  gameDataPath,
  gameOutputDir,
  generatedGameOutputs,
} from './gen/output-layout.ts';

// The bucket's CORS rule allowlists the deployed origin, not localhost, so a
// dev browser can't fetch it cross-origin — /romsearch/<key> proxies it
// same-origin (dev serve only; the deployed site goes to the bucket direct).
// The bucket base and key encoding come from runtime/rom-source.ts so there is
// one definition. Artwork needs no equivalent route: artwork-source.ts always
// loads it from that same bucket, so a developer sees exactly the scans a
// visitor does — a /artwork mount reading .data used to make the two diverge,
// and cost every cover a wasted same-origin 404 first.

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  // The web-sized siblings buildApp ships into dist/artwork — every displayed
  // cover, marquee and cabinet is one of these.
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.zip': 'application/zip',
  '.wasm': 'application/wasm',
  '.cypher': 'text/plain; charset=utf-8',
};

/** Scan dist/ for generated games (meta.json + config.json) and flag artwork
 *  availability. ROMs are deliberately NOT scanned: the app never reads ROMs
 *  from the server — the visitor's browser store is the only source.
 *
 * `supported` requires both a compiled generated board and its generated
 * runtime report to mark the board runnable. The report can distinguish a
 * source-complete board from one verified through runtime device bridges, and
 * a board whose only remaining gap silences it from one that cannot run at
 * all -- the former is `supported` and `silent`. */
export async function gamesManifest(outRoot: string, artDir: string): Promise<string> {
  const games: unknown[] = [];
  const published = new Set(readBuildManifest(outRoot)?.publishedTargets ?? []);
  // Fail CLOSED on a mixed build too. Scanning dist for game directories will
  // happily find a target left over from an earlier --targets run, whose board
  // is registered against a hardware closure that was never built for it.
  const closureFailures = buildClosureFailures(
    outRoot,
    generatedGameOutputs(outRoot).map(entry => entry.game),
  );
  if (closureFailures.length) {
    throw new Error(
      `refusing to serve a mixed generated distribution:\n  ${closureFailures.join('\n  ')}\n` +
      'run `npm run gen:all` to rebuild the catalog and closure together',
    );
  }
  // Fail CLOSED when the closure manifest is missing or unparseable: a stale
  // board.js without its manifest must never present as playable (a stale
  // bundle plus a fresh manifest burned us on junofrst once already).
  const hardware = await readFile(
    join(outRoot, 'runtime/generated/hardware-manifest.json'),
    'utf8',
  ).then(text => JSON.parse(text) as {
    hardware?: {
      type: string;
      status: string;
      executable?: boolean;
      /** internal part satisfied by these executable host devices */
      hostedBy?: string[];
      uses: { game: string }[];
    }[];
  }, () => null);
  for (const category of GAME_CATEGORIES) {
    const entries = await readdir(join(outRoot, 'games', category)).catch(() => [] as string[]);
    for (const entry of entries) {
      if (!published.has(entry)) continue;
      try {
        const dir = gameOutputDir(outRoot, category, entry);
        const meta = JSON.parse(await readFile(join(dir, 'meta.json'), 'utf8'));
        await stat(join(dir, 'config.json'));
        meta.category = category;
        meta.dataPath = gameDataPath(category, entry);
        meta.hasArt = await stat(join(artDir, `${entry}.zip`)).then(() => true, () => false);
        // Whether a promotional flyer exists to crop the menu tile from. The
        // menu used to just ask for one and let it 404: two wasted round trips
        // per coverless machine, the second against a bucket that answers in
        // ~1.8s, and the tile sat black until both had failed. Every arcade
        // target has a scan, so only the console showed it.
        //
        // Asked of what the SITE serves first — dist/artwork holds the shipped
        // `.webp` sibling — and only then of the local scan tree, which
        // `--serve` does not mount at all. Reading .data alone would answer
        // "no cover" for every machine on the deployed shape and take the
        // whole shelf's artwork down with it.
        meta.hasCover = await Promise.all([
          stat(join(outRoot, 'artwork/covers', `${entry}.webp`)).then(() => true, () => false),
          ...(artDir ? ['png', 'webp'].map(extension =>
            stat(join(artDir, 'covers', `${entry}.${extension}`)).then(() => true, () => false),
          ) : []),
        ]).then(found => found.some(Boolean));
        const report = await readFile(join(dir, 'runtime-report.json'), 'utf8')
          .then(text => JSON.parse(text) as {
            playable?: boolean;
            playableWithoutSound?: boolean;
            silentGaps?: string[];
            generationGaps?: string[];
          }, () => null);
        const generationGaps = hardware === null
          ? ['hardware-manifest.json missing or unreadable']
          : report === null
            ? ['runtime-report.json missing or unreadable']
            : report.generationGaps ?? [];
        const boardCompiled = await stat(join(dir, 'generated/board.js'))
          .then(() => true, () => false);
        // A board runs when its execution path is complete. A gap that only
        // silences it -- a sound device with nothing but an audio route -- is
        // reported, not refused: the machine draws and takes input either way,
        // and calling that "cannot be played" left every Atari 2600 cartridge
        // unplayable in the room over a chip nothing reads back.
        meta.supported = hardware !== null && boardCompiled &&
          (report?.playable === true || report?.playableWithoutSound === true);
        meta.silent = report?.playable !== true && report?.playableWithoutSound === true;
        if (report?.silentGaps?.length) meta.silentGaps = report.silentGaps;
        meta.generationGaps = generationGaps;
        games.push(meta);
      } catch { /* not a generated game dir */ }
    }
  }
  return JSON.stringify(games);
}

export function serve(rootDirs: Record<string, string>, port: number): Promise<number> {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? '/', 'http://localhost');
      let path = normalize(decodeURIComponent(url.pathname)).replace(/^\/+/, '');
      if (path.includes('..')) { res.writeHead(403).end(); return; }
      if (path === 'games.json') {
        // Build the manifest before committing the response. Manifest
        // validation can fail closed for a mixed/stale distribution; writing
        // the 200 headers first made the catch path attempt a second
        // writeHead(), crashing the development server.
        const manifest = await gamesManifest(rootDirs[''], rootDirs['artwork'] ?? '');
        res.writeHead(200, { 'content-type': MIME['.json'], 'cache-control': 'no-store' });
        res.end(manifest);
        return;
      }
      if (path.startsWith('romsearch/')) {
        // Keys are the .data/roms layout: "pacman.zip" (legacy arcade form),
        // "consoles/nes/10yard.zip", or a console dump under new/ whose name
        // carries spaces, brackets and parentheses. path is already decoded and
        // ".." rejected above; each segment is re-encoded for the upstream GET.
        const key = path.slice('romsearch/'.length);
        const segments = key.split('/');
        const ok = segments.length >= 1 && segments.length <= 4
          && segments.every(segment => segment.length > 0 && segment.length <= 128
            && !/[\\<>"'`?#]/.test(segment))
          && /\.(zip|json)$/i.test(key);
        if (!ok) { res.writeHead(400).end(); return; }
        // A bare "<set>.zip" keeps working for the arcade drop screen.
        const bucketKey = segments.length === 1 ? `arcade/${key}` : key;
        const upstream = await fetch(`${ROM_BUCKET_BASE}/${encodeRomKey(bucketKey)}`)
          .catch(() => null);
        if (!upstream?.ok) { res.writeHead(upstream?.status === 404 ? 404 : 502).end(); return; }
        // Dumps are pulled once and stored by the client, so they stay
        // no-store; the availability index is re-read on every visit and only
        // changes when the bucket is re-synced, so a short cache removes a
        // ~1 MB round trip from each reload.
        const json = /\.json$/i.test(key);
        res.writeHead(200, {
          'content-type': json ? MIME['.json'] : MIME['.zip'],
          'cache-control': json ? 'max-age=300' : 'no-store',
        });
        res.end(Buffer.from(await upstream.arrayBuffer()));
        return;
      }
      // route by first segment if it names a mount, else default mount ''
      const [head, ...rest] = path.split('/');
      let root = rootDirs[''];
      if (head in rootDirs) { root = rootDirs[head]; path = rest.join('/'); }
      if (!path) path = 'index.html';
      let file = join(root, path);
      const s = await stat(file).catch(() => null);
      if (s?.isDirectory()) {
        // match github pages: redirect /app -> /app/ so relative URLs resolve
        if (!url.pathname.endsWith('/')) {
          res.writeHead(301, { location: `${url.pathname}/` }).end();
          return;
        }
        file = join(file, 'index.html');
      }
      const body = await readFile(file);
      res.writeHead(200, {
        'content-type': MIME[extname(file)] ?? 'application/octet-stream',
        'cache-control': 'no-store',
      });
      res.end(body);
    } catch {
      if (res.headersSent) {
        if (!res.writableEnded) res.end();
        return;
      }
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
