import assert from 'node:assert/strict';
import {
  ARTWORK_BUCKET_BASE,
  artworkUrl,
  artworkPaths,
  artworkSources,
  webArtworkUrl,
  encodeArtworkPath,
  fetchArtworkBytes,
  fetchArtworkImage,
} from './artwork-source.ts';

// --- path encoding -----------------------------------------------------------------
// Cartridge scans carry spaces, brackets and parentheses; the separators must
// stay separators so the key still addresses carts/<list>/<file>.
assert.equal(encodeArtworkPath('covers/dkong.png'), 'covers/dkong.png');
assert.equal(encodeArtworkPath('juno first.zip'), 'juno%20first.zip');
assert.equal(
  encodeArtworkPath('carts/nes/Argos no Senshi (J) [T+Eng].jpg'),
  'carts/nes/Argos%20no%20Senshi%20(J)%20%5BT%2BEng%5D.jpg',
);

// --- the one base ------------------------------------------------------------------
assert.equal(
  artworkUrl('media/marquees/dkong.png'),
  `${ARTWORK_BUCKET_BASE}/media/marquees/dkong.png`,
);

// --- every tree prefers its web sibling ---------------------------------------------
// One rule for all three trees: the extension alone separates the scan from the
// sibling, so the pair sorts adjacent and a gap shows up in a plain `ls`. Order
// matters more than either path — the web one must come first, and the scan
// must stay reachable so an image added without a sibling renders rather than
// vanishing.
assert.deepEqual(
  artworkPaths('covers/dkong.png'),
  ['covers/dkong.webp', 'covers/dkong.png'],
);
assert.deepEqual(
  artworkPaths('media/marquees/1942.png'),
  ['media/marquees/1942.webp', 'media/marquees/1942.png'],
);
assert.deepEqual(
  artworkPaths('media/cabinets/pacman.png'),
  ['media/cabinets/pacman.webp', 'media/cabinets/pacman.png'],
);
// The sibling is served by the site, the scan by the bucket. Two origins, and
// which one a path lands on is the whole point: same-origin images multiplex
// over the connection the app already has, where the bucket caps at six and
// answers in ~870 ms.
assert.equal(webArtworkUrl('covers/1942.webp'), '/artwork/covers/1942.webp');
assert.deepEqual(artworkSources('covers/1942.png'), [
  '/artwork/covers/1942.webp',
  `${ARTWORK_BUCKET_BASE}/covers/1942.png`,
]);
// Root-relative, not relative: the menu lives at /app/ and a dossier at
// /app/g/<game>/dossier/, and both must resolve to the same file.
assert.ok(artworkSources('covers/1942.png')[0].startsWith('/'));
// Only the extension is rewritten: a bezel zip has no sibling and must be left
// exactly as it is, or the fallback would fetch a path that cannot exist.
assert.deepEqual(artworkPaths('dkong.zip'), ['dkong.zip', 'dkong.zip']);

// --- the bucket is the only source -------------------------------------------------
const original = globalThis.fetch;
function stubFetch(handler: (url: string) => Response): string[] {
  const seen: string[] = [];
  globalThis.fetch = ((input: string | URL) => {
    const url = String(input);
    seen.push(url);
    return Promise.resolve(handler(url));
  }) as typeof fetch;
  return seen;
}

// One request, straight to the bucket — no same-origin probe first. A shelf
// asks for all its covers at once, so a probe that only stops after a bucket
// reply never stops in time: every cover issues its 404 before the first
// response lands. The deployed menu opened on 40+ failed requests.
let seen = stubFetch(() => new Response(new Uint8Array([1, 2, 3]), { status: 200 }));
assert.deepEqual([...(await fetchArtworkBytes('dkong.zip'))!], [1, 2, 3]);
assert.deepEqual(seen, [`${ARTWORK_BUCKET_BASE}/dkong.zip`]);

// Localhost is no different: a developer's scans must not diverge from what a
// visitor actually sees.
seen = stubFetch(() => new Response(new Uint8Array([4]), { status: 200 }));
assert.deepEqual([...(await fetchArtworkBytes('pacman.zip'))!], [4]);
assert.deepEqual(seen, [`${ARTWORK_BUCKET_BASE}/pacman.zip`]);

// the bucket does not have it: a miss is never an error, every caller has a fallback
// that needs no artwork at all
seen = stubFetch(() => new Response(null, { status: 404 }));
assert.equal(await fetchArtworkBytes('nosuchgame.zip'), null);
assert.deepEqual(seen, [`${ARTWORK_BUCKET_BASE}/nosuchgame.zip`]);

// a throwing fetch (CORS, offline) is a miss too, not a crash
globalThis.fetch = (() => Promise.reject(new TypeError('Failed to fetch'))) as typeof fetch;
assert.equal(await fetchArtworkBytes('dkong.zip'), null);

// --- images survive a byte-path miss ------------------------------------------------
// The byte path is the one thing a CORS rule can break, and it must never take
// the covers down with it: the flyer falls back to a plain <img> at the CDN,
// which needs no CORS. That costs the matte crop, not the cover.
const decoded: string[] = [];
Object.defineProperty(globalThis, 'Image', {
  configurable: true,
  value: class {
    onload: (() => void) | null = null;
    set src(url: string) {
      decoded.push(url);
      queueMicrotask(() => this.onload?.());
    }
  },
});
globalThis.fetch = (() => Promise.reject(new TypeError('Failed to fetch'))) as typeof fetch;
assert.ok(await fetchArtworkImage('covers/dkong.png'));
assert.deepEqual(decoded, [`${ARTWORK_BUCKET_BASE}/covers/dkong.png`]);

globalThis.fetch = original;
console.log('artwork-source.spec: path encoding, source order and miss handling passed');
