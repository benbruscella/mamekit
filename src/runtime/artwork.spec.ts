import assert from 'node:assert/strict';
import { findWindow, loadArtwork, parseArtworkLayout } from './artwork.ts';

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

const modernLayout = `
<mamelayout version="2">
  <element name="bezel_m"><image file="bezel.png" /></element>
  <element name="overlay_m">
    <rect><bounds left="0" top="0" right="1200" bottom="1600" />
      <color red="1" green="1" blue="1" /></rect>
    <rect><bounds left="0" top="1140" right="1200" bottom="1480" />
      <color red="0.125" green="1" blue="0.125" /></rect>
  </element>
  <view name="Upright_Artwork_Midway">
    <screen index="0"><bounds x="1227" y="1250" width="1547" height="2063" /></screen>
    <collection name="Overlay">
      <element ref="overlay_m" blend="multiply">
        <bounds x="1227" y="1250" width="1547" height="2063" />
      </element>
    </collection>
    <collection name="Bezel">
      <element ref="bezel_m"><bounds x="0" y="0" width="4000" height="4133" /></element>
    </collection>
  </view>
</mamelayout>`;
const parsedModern = parseArtworkLayout(modernLayout);
assert.ok(parsedModern);
assert.deepEqual({ ...parsedModern, tints: [] }, {
  name: 'Upright_Artwork_Midway',
  screen: { x: 1227, y: 1250, w: 1547, h: 2063 },
  art: { x: 0, y: 0, w: 4000, h: 4133 },
  file: 'bezel.png',
  rotate: 0,
  tints: [],
});
assert.equal(parsedModern.tints.length, 1);
assert.ok(Math.abs(parsedModern.tints[0]!.y - 0.7125) < 1e-12);
assert.deepEqual(
  { ...parsedModern.tints[0], y: 0.7125 },
  {
    x: 0, y: 0.7125, w: 1, h: 0.2125,
    red: 0.125, green: 1, blue: 0.125, alpha: 1,
  },
);

const multiViewLayout = `
<mamelayout version="2">
  <element name="plain_bezel"><image file="plain.png" /></element>
  <element name="bubble_bezel"><image file="bubble.png" /></element>
  <view name="Upright_Artwork">
    <screen index="0"><bounds x="10" y="10" width="100" height="100" /></screen>
    <element ref="plain_bezel"><bounds x="0" y="0" width="120" height="120" /></element>
  </view>
  <view name="Bezel_Homebrew">
    <screen index="0"><bounds x="20" y="20" width="80" height="80" /></screen>
    <element ref="bubble_bezel"><bounds x="0" y="0" width="120" height="120" /></element>
  </view>
</mamelayout>`;
assert.equal(
  parseArtworkLayout(multiViewLayout)?.file,
  'bubble.png',
  'an explicit bezel view must win over a plain upright surround',
);

if (originalDocument === undefined) {
  delete (globalThis as { document?: Document }).document;
} else {
  Object.defineProperty(globalThis, 'document', { configurable: true, value: originalDocument });
}
globalThis.fetch = originalFetch;

console.log('artwork.spec: layout, transparent window and missing artwork fallback passed');
