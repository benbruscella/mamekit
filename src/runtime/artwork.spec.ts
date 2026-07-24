import assert from 'node:assert/strict';
import { findWindow, loadArtwork } from './artwork.ts';

const originalDocument = globalThis.document;
const originalFetch = globalThis.fetch;
const alpha = new Uint8ClampedArray(5 * 5 * 4);
for (let y = 0; y < 5; y++) {
  for (let x = 0; x < 5; x++) {
    alpha[(y * 5 + x) * 4 + 3] = x >= 1 && x <= 3 && y >= 1 && y <= 3 ? 0 : 255;
  }
}
const context = {
  drawImage: () => {},
  getImageData: () => ({ data: alpha }),
};
Object.defineProperty(globalThis, 'document', {
  configurable: true,
  value: {
    createElement: (tag: string) => {
      assert.equal(tag, 'canvas');
      return { width: 0, height: 0, getContext: () => context };
    },
  },
});

assert.deepEqual(findWindow({ width: 5, height: 5 } as ImageBitmap), {
  x: 1,
  y: 1,
  w: 3,
  h: 3,
});
alpha[(2 * 5 + 2) * 4 + 3] = 255;
assert.equal(findWindow({ width: 5, height: 5 } as ImageBitmap), null);

let requested = '';
globalThis.fetch = (async input => {
  requested = String(input);
  return { ok: false } as Response;
}) as typeof fetch;
assert.equal(await loadArtwork('juno first', 'bezel'), null);
assert.equal(requested, '../artwork/juno%20first.zip');

if (originalDocument === undefined) {
  delete (globalThis as { document?: Document }).document;
} else {
  Object.defineProperty(globalThis, 'document', { configurable: true, value: originalDocument });
}
globalThis.fetch = originalFetch;

console.log('artwork.spec: transparent window detection and missing artwork fallback passed');
