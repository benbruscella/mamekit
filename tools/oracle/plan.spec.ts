import assert from 'node:assert/strict';
import type { FieldBinding } from '../../src/runtime/input.ts';
import { inputTimeline, MEDIA_SWITCH, moveBootEvent, parseRanges, ramFrames, startSchedule } from './plan.ts';
import { mameFrames } from './mame-side.ts';

const bindings: FieldBinding[] = [
  { port: 'ctrl1:JOYPAD', mask: 0x08, keys: ['Enter'], label: 'Start', type: 'IPT_START' },
  { port: 'ctrl1:JOYPAD', mask: 0x01, keys: ['KeyX'], label: 'A', type: 'IPT_BUTTON1' },
  { port: 'ctrl2:GUN_X', mask: 0xff, keys: [], label: 'Aim X', type: 'IPT_LIGHTGUN_X', lightgun: { axis: 'x', min: 0, max: 255 } },
  { port: 'ctrl2:GUN_Y', mask: 0xff, keys: [], label: 'Aim Y', type: 'IPT_LIGHTGUN_Y', lightgun: { axis: 'y', min: 0, max: 239 } },
  { port: 'IN0', mask: 0x10, keys: ['KeyP'], label: 'Paddle', type: 'IPT_PADDLE', activeValue: 200 },
];

// The #167 survey's schedule: Start held six frames every 300, from 300.
assert.deepEqual(startSchedule(bindings, 1000).map(action => action.atFrame), [299, 599, 899]);
assert.throws(() => startSchedule(bindings.slice(1), 1000), /no Start key/);

// Frames follow runGameAcceptance: a key is held, then released, before the
// next action is looked at, and an action whose frame has passed goes at once.
const timeline = inputTimeline([
  { atFrame: 10, code: 'Enter', heldFrames: 6, releasedFrames: 4 },
  { atFrame: 12, code: 'KeyX', heldFrames: 2, releasedFrames: 0 },
  { atFrame: 30, aim: [128, 100] },
  { atFrame: 30, text: 'RUN{ENTER}' },
  { atFrame: 40, reset: true },
], bindings, { frame: 181, text: 'LOAD{ENTER}', play: true });
assert.deepEqual(timeline.inputs, [
  { port: 'ctrl1:JOYPAD', mask: 0x08 },
  { port: 'ctrl1:JOYPAD', mask: 0x01 },
  { port: 'ctrl2:GUN_X', mask: 0xff },
  { port: 'ctrl2:GUN_Y', mask: 0xff },
]);
assert.deepEqual(timeline.events, {
  10: [{ kind: 'press', input: 0 }],
  16: [{ kind: 'release', input: 0 }],
  20: [{ kind: 'press', input: 1 }],
  22: [{ kind: 'release', input: 1 }],
  30: [{ kind: 'set', input: 2, value: 128 }, { kind: 'set', input: 3, value: 100 }, { kind: 'text', text: 'RUN{ENTER}' }],
  40: [{ kind: 'reset' }],
  181: [{ kind: 'boot', text: 'LOAD{ENTER}', play: true }],
});
// A quickload holds the start until it has loaded: the command moves to the
// frame it was typed on, alone or beside other input, and nothing else moves.
const moved = inputTimeline([{ atFrame: 151, code: 'Enter', heldFrames: 1, releasedFrames: 0 }], bindings,
  { frame: 151, text: 'RUN{ENTER}', play: false });
moveBootEvent(moved, 160);
assert.deepEqual(moved.events, {
  151: [{ kind: 'press', input: 0 }],
  152: [{ kind: 'release', input: 0 }],
  160: [{ kind: 'boot', text: 'RUN{ENTER}', play: false }],
});
moveBootEvent(moved, 160);
assert.deepEqual(Object.keys(moved.events), ['151', '152', '160'], 'moving to where it already is changes nothing');

// MAME is told the medium for every kind of shelf the software room mounts.
assert.deepEqual(MEDIA_SWITCH, { cartridge: 'cart', cassette: 'cass', floppy: 'flop', quickload: 'quik' });

assert.throws(() => inputTimeline([{ atFrame: 1, code: 'KeyQ', heldFrames: 1, releasedFrames: 0 }], bindings), /no control is bound to KeyQ/);
assert.throws(() => inputTimeline([{ atFrame: 1, code: 'KeyP', heldFrames: 1, releasedFrames: 0 }], bindings), /not given yet/);

assert.deepEqual(parseRanges('maincpu:0-7ff,6000'), { tag: 'maincpu', ranges: [[0, 0x7ff], [0x6000, 0x6000]] });
assert.deepEqual(parseRanges('iec8:c1541:ucd5:0-7ff'), { tag: 'iec8:c1541:ucd5', ranges: [[0, 0x7ff]] });
assert.deepEqual(ramFrames({ cpus: [], from: 1, to: 10, every: 4 }), [1, 5, 9]);

// MAME captures every compared frame at every offset tried, never frame 0.
assert.deepEqual(mameFrames({ frames: [1, 600], offsets: [-1, 0, 1] } as never, [2]),
  { snapshots: [1, 2, 599, 600, 601], ram: [1, 2, 3] });

console.log('oracle plan.spec: ok');
