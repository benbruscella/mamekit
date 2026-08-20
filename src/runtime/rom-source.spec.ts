import assert from 'node:assert/strict';
import {
  ROM_BUCKET_BASE,
  cartAvailability,
  encodeRomKey,
  fetchRomBytes,
  fetchRomJson,
  romSourceUrls,
} from './rom-source.ts';

// --- key encoding ------------------------------------------------------------------
// Console dumps carry spaces, brackets and parentheses; the separators must stay
// separators so the bucket key still addresses new/<file>.
assert.equal(encodeRomKey('arcade/pacman.zip'), 'arcade/pacman.zip');
assert.equal(
  encodeRomKey('consoles/nes/new/Argos no Senshi (J) [T+Eng].zip'),
  'consoles/nes/new/Argos%20no%20Senshi%20(J)%20%5BT%2BEng%5D.zip',
);

// --- source order: same-origin proxy first, bucket fallback second -----------------
assert.deepEqual(romSourceUrls('consoles/nes/10yard.zip'), [
  '/romsearch/consoles/nes/10yard.zip',
  `${ROM_BUCKET_BASE}/consoles/nes/10yard.zip`,
]);

// --- fetch falls through to the bucket, then gives up ------------------------------
const original = globalThis.fetch;
function stubFetch(handler: (url: string) => Response | Promise<Response>): string[] {
  const seen: string[] = [];
  globalThis.fetch = ((input: string | URL) => {
    const url = String(input);
    seen.push(url);
    return Promise.resolve(handler(url));
  }) as typeof fetch;
  return seen;
}

// proxy miss -> bucket answers
let seen = stubFetch(url => {
  if (!url.startsWith('http')) return new Response(null, { status: 404 });
  return new Response(new Uint8Array([1, 2, 3]), { status: 200 });
});
assert.deepEqual([...(await fetchRomBytes('consoles/nes/10yard.zip'))!], [1, 2, 3]);
assert.equal(seen.length, 2, 'the proxy is tried before the bucket');

// nothing has it -> null, never a throw: the drop zone stays the fallback
seen = stubFetch(() => new Response(null, { status: 404 }));
assert.equal(await fetchRomBytes('consoles/nes/nope.zip'), null);
assert.equal(seen.length, 2);

// json helper tolerates a malformed body the same way
stubFetch(() => new Response('not json', { status: 200 }));
assert.equal(await fetchRomJson('consoles/nes/_manifest.json'), null);

stubFetch(() => new Response(JSON.stringify({ carts: [] }), { status: 200 }));
assert.deepEqual(await fetchRomJson('consoles/nes/_manifest.json'), { carts: [] });
globalThis.fetch = original;

// --- manifest -> availability ------------------------------------------------------
const availability = cartAvailability({
  carts: [
    {
      file: '10-Yard Fight (U) [!].zip',
      status: 'verified',
      target: '10yard.zip',
      match: { name: '10yard', description: '10-Yard Fight (Europe, USA)', year: '1985', publisher: 'Irem' },
    },
    { file: 'Argos no Senshi (J) [T+Eng].zip', status: 'unverified', target: 'new/Argos no Senshi (J) [T+Eng].zip' },
    { file: 'City Connection (U) [!].zip', status: 'duplicate', target: 'new/City Connection (U) [!].zip' },
    // a verified row with no softlist name cannot be placed on a slot
    { file: 'weird.zip', status: 'verified', target: 'weird.zip' },
    // non-zip rows (a stray manifest entry) are not cartridges
    { file: 'notes.txt', status: 'verified', target: 'notes.txt' },
  ],
});
assert.deepEqual(availability, [
  {
    file: '10yard.zip',
    name: '10yard',
    description: '10-Yard Fight (Europe, USA)',
    year: '1985',
    publisher: 'Irem',
    tier: 'verified',
  },
  { file: 'new/Argos no Senshi (J) [T+Eng].zip', tier: 'experimental' },
  { file: 'new/City Connection (U) [!].zip', tier: 'experimental' },
  { file: 'weird.zip', tier: 'experimental' },
]);

// a missing or malformed manifest is simply "no carts available"
assert.deepEqual(cartAvailability(null), []);
assert.deepEqual(cartAvailability({}), []);
assert.deepEqual(cartAvailability({ carts: 'nope' }), []);

console.log('rom-source.spec: key encoding, source order, fallback and availability passed');
