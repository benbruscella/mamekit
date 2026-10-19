// One-click play's shared pieces: which media slots a title leaves empty and
// takes the firmware of, which transport takes which image, and the start
// sequence -- the shelf's command typed once the machine is up, then PLAY.

import assert from 'node:assert/strict';
import type { FieldBinding } from './input.ts';
import { NaturalKeyboard } from './natural-keyboard.ts';
import type { RomRegionSpec, SoftwareShelves } from './shell.ts';
import { claimImages, emptyMediaSlots, TitleStart, withoutSlotFirmware } from './title-start.ts';

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

console.log('title-start.spec: empty slots, slot firmware, image claims and the start sequence passed');
