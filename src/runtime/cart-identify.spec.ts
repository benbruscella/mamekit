import assert from 'node:assert/strict';
import { cartImageFromSoftlistSet, identifyCartImage, resolveFlatCart } from './cart-identify.ts';
import { crc32 } from './zip.ts';
import type { SoftCatalog, SoftEntry } from './nes-ines.ts';

const hex8 = (value: number): string => (value >>> 0).toString(16).padStart(8, '0');

/** A chip whose bytes are a repeating marker, so each one has its own crc. */
function chip(marker: number, size: number): Uint8Array {
  const bytes = new Uint8Array(size);
  for (let index = 0; index < size; index++) bytes[index] = (marker + index) & 0xff;
  return bytes;
}

function image(...chips: Uint8Array[]): Uint8Array {
  const total = chips.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of chips) { out.set(part, offset); offset += part.length; }
  return out;
}

function entry(name: string, ...chips: Uint8Array[]): SoftEntry {
  let offset = 0;
  return {
    name,
    description: name,
    year: '1982',
    publisher: 'Coleco',
    slot: '',
    prg: {
      size: chips.reduce((sum, part) => sum + part.length, 0),
      roms: chips.map(part => {
        const rom = { size: part.length, crc: hex8(crc32(part)), offset };
        offset += part.length;
        return rom;
      }),
    },
  };
}

const first = chip(0x10, 0x2000);
const second = chip(0x40, 0x2000);
const congo1 = chip(0x70, 0x2000);
const congo2 = chip(0x90, 0x2000);
const congo3 = chip(0xb0, 0x2000);
const other = chip(0xd0, 0x2000);

const catalog: SoftCatalog = {
  list: 'coleco',
  description: 'ColecoVision cartridges',
  interface: 'coleco_cart',
  entries: [
    entry('carnival', first, second),
    entry('congo', congo1, congo2, congo3),
    entry('zaxxon', other),
  ],
  crcIndex: {},
};

// A dump that reproduces every declared chip is the catalogued one.
const exact = identifyCartImage(image(first, second), catalog);
assert.equal(exact?.entry.name, 'carnival');
assert.equal(exact?.verified, true);
assert.deepEqual([exact?.matched, exact?.total], [2, 2]);

// A dump whose leading chips match but whose last does not is still this
// title -- ColecoVision collections and MAME disagree on final chips often --
// but it is a different dump of it, so it must not claim to be catalogued.
const variant = identifyCartImage(image(congo1, congo2, other), catalog);
assert.equal(variant?.entry.name, 'congo');
assert.equal(variant?.verified, false);
assert.deepEqual([variant?.matched, variant?.total], [2, 3]);

// Between equal partial matches the entry claiming fewer chips wins, so a
// dump is not reported as a smaller fraction of a longer cartridge.
const shortEntry = entry('short', congo1, other);
const longEntry = entry('long', congo1, chip(0x33, 0x2000), chip(0x55, 0x2000));
const fewest = identifyCartImage(image(congo1, chip(0xee, 0x2000)), {
  ...catalog, entries: [longEntry, shortEntry],
});
assert.equal(fewest?.entry.name, 'short');
assert.deepEqual([fewest?.matched, fewest?.total], [1, 2]);

// An exact match wins over a partial one whatever the catalog order.
const ordered = identifyCartImage(image(first, second), {
  ...catalog,
  entries: [entry('decoy', first, other, other), catalog.entries[0]!],
});
assert.equal(ordered?.entry.name, 'carnival');
assert.equal(ordered?.verified, true);

// Nothing in common with any entry is not a guess.
assert.equal(identifyCartImage(chip(0xf0, 0x2000), catalog), null);
assert.equal(identifyCartImage(new Uint8Array(), catalog), null);
assert.equal(identifyCartImage(image(first), null), null);

// A truncated dump degrades to a partial match rather than throwing.
const truncated = identifyCartImage(image(first, second.subarray(0, 0x1000)), catalog);
assert.equal(truncated?.entry.name, 'carnival');
assert.equal(truncated?.verified, false);
assert.equal(truncated?.matched, 1);

// Chips are read at their declared offsets, not in sequence: an entry whose
// second chip sits past a gap must still match.
const spaced: SoftEntry = {
  ...entry('spaced', first),
  prg: {
    size: 0x6000,
    roms: [
      { size: 0x2000, crc: hex8(crc32(first)), offset: 0 },
      { size: 0x2000, crc: hex8(crc32(congo3)), offset: 0x4000 },
    ],
  },
};
const gapped = identifyCartImage(image(first, other, congo3), {
  ...catalog, entries: [spaced],
});
assert.equal(gapped?.verified, true, 'chips are sliced at their declared offsets');

// --- how the console room grades a flat cartridge --------------------------

// coleco.xml names a `slot` feature on no entry at all, so an unnamed slot has
// to fall back to the cartridge slot's own default option. Without that every
// ColecoVision cartridge ever made resolves to no board and cannot be played.
{
  const unnamed = resolveFlatCart(image(first, second), catalog, {
    slots: ['standard', 'megacart'],
    games: [],
    defaultSlot: 'standard',
  });
  assert.equal(unnamed.slot, 'standard');
  assert.equal(unnamed.tier, 'experimental');
  assert.equal(unnamed.playable, true);
  assert.equal(unnamed.identified, true);
  assert.equal(unnamed.meta?.name, 'carnival');
  // A flat cartridge has no mapper number to report.
  assert.equal(unnamed.ines, undefined);
  assert.equal(unnamed.image?.size, 0x4000);
}

// A title on the verified list earns the tested tier, exactly as on the NES.
{
  const verified = resolveFlatCart(image(first, second), catalog, {
    slots: ['standard'],
    games: ['carnival'],
    defaultSlot: 'standard',
  });
  assert.equal(verified.tier, 'tested');
  assert.equal(verified.supported, true);
  assert.equal(verified.reason, undefined);
}

// A board this build does not implement is not playable, and says which board.
{
  const unsupported = resolveFlatCart(image(first, second), catalog, {
    slots: ['megacart'],
    games: [],
    defaultSlot: 'standard',
  });
  assert.equal(unsupported.tier, 'unsupported');
  assert.equal(unsupported.playable, false);
  assert.match(unsupported.reason ?? '', /standard/);
}

// An unrecognised dump still plays on a supported board -- the visitor's own
// homebrew or a hack -- but is never presented as catalogued.
{
  const unknown = resolveFlatCart(chip(0xf0, 0x2000), catalog, {
    slots: ['standard'],
    games: ['carnival'],
    defaultSlot: 'standard',
  });
  assert.equal(unknown.identified, false);
  assert.equal(unknown.meta, undefined);
  assert.equal(unknown.tier, 'experimental');
  assert.equal(unknown.playable, true);
}

// A dump that matches a catalogued title only in part is flagged as such
// rather than passed off as the catalogued dump.
{
  const variant = resolveFlatCart(image(congo1, congo2, other), catalog, {
    slots: ['standard'],
    games: ['congo'],
    defaultSlot: 'standard',
  });
  assert.equal(variant.meta?.name, 'congo');
  assert.equal(variant.approx, true);
  assert.equal(variant.tier, 'experimental', 'a variant dump is never the verified tier');
  assert.match(variant.reason ?? '', /different dump/);
}

// --- rebuilding a cartridge from a software-list chip set ------------------

// Chip file names do not sort into load order. MAME's ColecoVision set for
// Motocross Racer is `mtcracera.1` and `mtcracer.2`, which sort the second
// chip FIRST -- assembling by name there yields a cartridge that boots into
// nothing. Only the crc says where a chip belongs.
{
  const set = cartImageFromSoftlistSet(new Map([
    ['mtcracera.1', first],   // sorts second by name, belongs at offset 0
    ['mtcracer.2', second],   // sorts first by name, belongs at offset 0x2000
  ]), catalog);
  assert.ok(set, 'a complete chip set must rebuild');
  assert.equal(set.entry.name, 'carnival');
  assert.deepEqual([...set.bytes], [...image(first, second)],
    'chips are placed at their declared offsets, not in file-name order');
}

// A set missing one of its chips is not a cartridge.
assert.equal(cartImageFromSoftlistSet(new Map([['a', first]]), catalog), null);
// Nothing in the catalog matches these chips.
assert.equal(cartImageFromSoftlistSet(new Map([
  ['a', chip(0xf0, 0x2000)], ['b', chip(0xf5, 0x2000)],
]), catalog), null);
assert.equal(cartImageFromSoftlistSet(new Map(), catalog), null);
assert.equal(cartImageFromSoftlistSet(new Map([['a', first]]), null), null);

console.log('cart-identify.spec: flat cartridge identification, grading and chip-set assembly passed');
