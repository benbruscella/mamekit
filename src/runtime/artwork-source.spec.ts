import assert from 'node:assert/strict';
import {
  ARTWORK_BUCKET_BASE,
  artworkUrl,
  encodeArtworkPath,
  fetchArtworkBytes,
  fetchArtworkImage,
  localArtworkUrl,
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

// --- the two bases -----------------------------------------------------------------
assert.equal(
  artworkUrl('media/marquees/dkong.png'),
  `${ARTWORK_BUCKET_BASE}/media/marquees/dkong.png`,
);
// relative to the /app/ page, so the dev site works under any base path
assert.equal(localArtworkUrl('media/marquees/dkong.png'), '../artwork/media/marquees/dkong.png');

// --- fetch order: the dev mount first, then the bucket -----------------------------
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

// dev mount miss -> the bucket answers
let seen = stubFetch(url =>
  url.startsWith('http')
    ? new Response(new Uint8Array([1, 2, 3]), { status: 200 })
    : new Response(null, { status: 404 }));
assert.deepEqual([...(await fetchArtworkBytes('dkong.zip'))!], [1, 2, 3]);
assert.deepEqual(seen, ['../artwork/dkong.zip', `${ARTWORK_BUCKET_BASE}/dkong.zip`]);

// That miss proved there is no dev mount (a static deploy), so it is not tried
// again — a shelf of 68 covers must not spend 68 round trips proving it twice.
seen = stubFetch(() => new Response(new Uint8Array([4]), { status: 200 }));
assert.deepEqual([...(await fetchArtworkBytes('pacman.zip'))!], [4]);
assert.deepEqual(seen, [`${ARTWORK_BUCKET_BASE}/pacman.zip`]);

// neither source has it: a miss is never an error, every caller has a fallback
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
