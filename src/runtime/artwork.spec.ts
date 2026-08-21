import assert from 'node:assert/strict';
import { loadArtwork, parseArtworkLayout } from './artwork.ts';

const originalDocument = globalThis.document;
const originalFetch = globalThis.fetch;
const context = { drawImage: () => {} };
Object.defineProperty(globalThis, 'document', {
  configurable: true,
  value: {
    createElement: (tag: string) => {
      assert.equal(tag, 'canvas');
      return { width: 0, height: 0, getContext: () => context };
    },
  },
});

// A game the site ships no bezel for: null, and — the point of this
// assertion — exactly ONE request. There is no fallback to the archival pack
// on the bucket. Reinstating one would send every game back to pulling 7-8 MB
// off an object store the moment a deploy dropped the sidecars, which is
// precisely how that regression shipped unnoticed once already.
const requested: string[] = [];
globalThis.fetch = (async input => {
  requested.push(String(input));
  return { ok: false } as Response;
}) as typeof fetch;
assert.equal(await loadArtwork('juno first'), null);
assert.deepEqual(requested, ['/artwork/bezels/juno%20first.json']);

// The shipped path: sidecar geometry + a .webp, and no zip fetched at all.
// The window comes back in the pixels of whatever the .webp decoded to, so
// the build is free to cap its width without the runtime knowing.
const originalCreateImageBitmap = globalThis.createImageBitmap;
globalThis.createImageBitmap = (async () =>
  ({ width: 1600, height: 1576 } as unknown as ImageBitmap)) as typeof createImageBitmap;
const shippedSidecar = {
  name: 'Upright_Artwork',
  screen: { x: 1000, y: 500, w: 2000, h: 1500 },
  art: { x: 0, y: 0, w: 4000, h: 3940 },
  rotate: 0,
  tints: [],
};
requested.length = 0;
globalThis.fetch = (async input => {
  const url = String(input);
  requested.push(url);
  return {
    ok: true,
    json: async () => shippedSidecar,
    blob: async () => ({}) as Blob,
  } as Response;
}) as typeof fetch;
const shipped = await loadArtwork('digdug');
assert.deepEqual(requested, ['/artwork/bezels/digdug.json', '/artwork/bezels/digdug.webp']);
assert.ok(shipped);
// 1600/4000 = 0.4 across, 1576/3940 = 0.4 down: the same fractions of the
// image the un-capped 4000px PNG would have produced.
assert.deepEqual(shipped.window, { x: 400, y: 200, w: 800, h: 600 });
globalThis.createImageBitmap = originalCreateImageBitmap;

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
    <bounds x="10" y="15" width="100" height="90" />
    <screen index="0"><bounds x="20" y="20" width="80" height="80" /></screen>
    <element ref="bubble_bezel"><bounds x="0" y="0" width="120" height="120" /></element>
  </view>
</mamelayout>`;
assert.equal(
  parseArtworkLayout(multiViewLayout)?.file,
  'bubble.png',
  'an explicit bezel view must win over a plain upright surround',
);
assert.deepEqual(parseArtworkLayout(multiViewLayout)?.bounds, {
  x: 10, y: 15, w: 100, h: 90,
});

const instructionFirstLayout = `
<mamelayout version="2">
  <element name="inst"><image file="instructions.png" /></element>
  <element name="bezel"><image file="motorace_bezel.png" /></element>
  <view name="Upright_Artwork">
    <screen index="0"><bounds x="20" y="30" width="80" height="100" /></screen>
    <bezel element="inst"><bounds x="110" y="20" width="30" height="50" /></bezel>
    <bezel element="bezel"><bounds x="0" y="0" width="160" height="180" /></bezel>
  </view>
</mamelayout>`;
assert.equal(
  parseArtworkLayout(instructionFirstLayout)?.file,
  'motorace_bezel.png',
  'an instruction-card placement must not replace the cabinet bezel',
);

if (originalDocument === undefined) {
  delete (globalThis as { document?: Document }).document;
} else {
  Object.defineProperty(globalThis, 'document', { configurable: true, value: originalDocument });
}
globalThis.fetch = originalFetch;

console.log('artwork.spec: layout parsing, shipped bezel geometry and no-fallback contract passed');
