// One-click play's shared pieces: which media slots a title leaves empty and
// takes the firmware of, which transport takes which image, and the start
// sequence -- the shelf's command typed once the machine is up, then PLAY.

import assert from 'node:assert/strict';
import type { FieldBinding } from './input.ts';
import { NaturalKeyboard } from './natural-keyboard.ts';
import type { RomRegionSpec, SoftwareShelves } from './shell.ts';
import { claimImages, emptyMediaSlots, softwarePart, TitleStart, withoutSlotFirmware } from './title-start.ts';
import { crc32 } from './zip.ts';

const shelf = (list: string, kind: 'cassette' | 'floppy' | 'cartridge', slots: string[] | undefined, mountable = true) => ({
  list, description: list, interface: list, kind, catalogUrl: `software/${list}.json`,
  extensions: [], entries: 1, mountable, ...(slots ? { slots } : {}),
});
const software: SoftwareShelves = {
  dumpsKey: 'computers/c64',
  shelves: [
    shelf('c64_cart', 'cartridge', undefined, false),
    shelf('c64_cass', 'cassette', ['tape']),
    shelf('c64_flop_orig', 'floppy', ['iec8']),
    shelf('c64_flop_misc', 'floppy', ['iec8']),
  ],
};

// A tape title boots without the drive, a disk title without the deck, and
// Power on (no title) with both; a slot attached since stays attached.
assert.deepEqual(emptyMediaSlots(software, 'c64_cass'), ['iec8']);
assert.deepEqual(emptyMediaSlots(software, 'c64_flop_misc'), ['tape']);
assert.deepEqual(emptyMediaSlots(software, undefined), []);
assert.deepEqual(emptyMediaSlots(software, 'c64_cass', ['iec8']), []);
assert.deepEqual(emptyMediaSlots(undefined, 'c64_cass'), []);

const rom = (region: string): RomRegionSpec => ({ region, size: 1, loads: [] }) as unknown as RomRegionSpec;
assert.deepEqual(
  withoutSlotFirmware([rom('kernal'), rom('iec8:c1541:ucd5'), rom('iec8x')], ['iec8']).map(spec => spec.region),
  ['kernal', 'iec8x'],
  'only the empty slot\'s own regions go with it',
);

// Each image goes to the first transport whose formats read it; the rest of a
// set's images ride along as its other sides.
const deck = { extensions: ['tap'] };
const drive = { extensions: ['g64', 'd64'] };
const image = (name: string) => ({ name, bytes: new Uint8Array(1) });
assert.deepEqual(
  claimImages([deck, drive], [image('side1.TAP'), image('disk.d64'), image('side2.tap'), image('notes.txt')])
    .map(images => images.map(item => item.name)),
  [['side1.TAP', 'side2.tap'], ['disk.d64']],
);

// The start: `delay` seconds of frames, the command typed at the machine's
// pace, PLAY once it has all been typed -- and nothing after a cancel.
const key = (label: string, chars: string[][]): FieldBinding =>
  ({ port: 'ROW', mask: 1, keys: [], label, type: 'IPT_KEYBOARD', activeLow: true, chars });
const bindings = [key('R', [['R']]), key('U', [['U']]), key('N', [['N']]), key('Return', [['\r']])];
const run = (cancelAt?: number) => {
  const presses: number[] = [];
  let frame = 0;
  let played = -1;
  const typing = new NaturalKeyboard({ press: (_, down) => { if (down) presses.push(frame); } }, bindings);
  const tape = { playing: () => played >= 0, play: () => { played = frame; } };
  const start = new TitleStart({ delay: 0.1, command: 'RUN{ENTER}', play: true }, 50, typing, tape);
  for (; frame < 200; frame++) {
    if (frame === cancelAt) { start.cancel(); typing.cancel(); }
    typing.tick(1 / 50);
    start.advance();
  }
  return { presses, played, active: start.active() };
};
const started = run();
assert.equal(started.presses.length, 4, 'every character of the command is typed');
assert.ok(started.presses[0]! > 5, 'nothing is typed before the delay has passed');
assert.ok(started.played > started.presses.at(-1)!, 'PLAY waits for the last key');
assert.equal(started.active, false);
const cancelled = run(3);
assert.deepEqual(cancelled.presses, [], 'a reset during the delay types nothing');
assert.equal(cancelled.played, -1);

// A quickload still holding its file keeps the command back past the delay:
// RUN typed before the program is in memory runs nothing.
{
  const presses: number[] = [];
  let frame = 0;
  const typing = new NaturalKeyboard({ press: (_, down) => { if (down) presses.push(frame); } }, bindings);
  const start = new TitleStart({ delay: 0.1, command: 'RUN{ENTER}' }, 50, typing, undefined, () => {}, () => frame >= 40);
  for (; frame < 200; frame++) { typing.tick(1 / 50); start.advance(); }
  assert.equal(presses.length, 4);
  assert.ok(presses[0]! > 40, 'typing waits until the start is ready');
}

// A cartridge set becomes the part its slot reads: each area at the list's
// size, each chip at its offset, found by crc whatever the zip calls it.
{
  const low = Uint8Array.from([1, 2, 3, 4]);
  const high = Uint8Array.from([9, 9]);
  const crc = (bytes: Uint8Array) => crc32(bytes).toString(16).padStart(8, '0');
  const entry = {
    slot: 'ocean',
    prg: { size: 6, roms: [
      { size: 4, crc: crc(low), offset: 2, file: 'u1', area: 'roml' },
      { size: 2, crc: crc(high), offset: 0, file: 'u2', area: 'romh' },
    ] },
    areas: { roml: 8, romh: 2 },
    features: { exrom: '0', game: '1' },
  };
  const part = softwarePart(new Map([['renamed.bin', low], ['other.bin', high]]), entry)!;
  assert.deepEqual([...part.areas.roml!], [0, 0, 1, 2, 3, 4, 0, 0], 'a chip lands at its offset in an area of the declared size');
  assert.deepEqual([...part.areas.romh!], [9, 9]);
  assert.deepEqual(part.features, { exrom: '0', game: '1', slot: 'ocean' }, 'the card it names rides with the features');
  assert.equal(softwarePart(new Map([['u1', low]]), entry), undefined, 'a set missing a chip is no part');
  assert.equal(softwarePart(new Map([['a.tap', low]]), { slot: '', prg: { size: 4, roms: [{ size: 4, crc: crc(low), offset: 0 }] } }), undefined,
    'a tape is an image, not a part');
  // Print Technik-Help: one 4 KB chip, reloaded into the top of its 8 KB ROML.
  const mirrored = softwarePart(new Map([['shelp.ba1', low]]), {
    slot: '', prg: { size: 4, roms: [{ size: 4, crc: crc(low), offset: 0, area: 'roml', reloads: [{ offset: 4, size: 4 }] }] },
    areas: { roml: 8 },
  })!;
  assert.deepEqual([...mirrored.areas.roml!], [1, 2, 3, 4, 1, 2, 3, 4], 'a reload reads the chip again from its start');
}

console.log('title-start.spec: empty slots, slot firmware, image claims, the start sequence and cartridge parts passed');
