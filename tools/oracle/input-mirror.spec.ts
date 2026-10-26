import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { KeyboardInput, type FieldBinding, type PortSpec } from '../../src/runtime/input.ts';
import type { GameInputAction } from '../../src/games/types.ts';
import { compareInputs } from './compare.ts';
import { luaEvents } from './mame-side.ts';
import { InputRecorder, inputTimeline, type Timeline } from './plan.ts';

// Every kind of control a contract drives, given to MAME the way the oracle
// gives it, must reach MAME as the value our side read on the same frame.
// MAME is modelled by the two rules oracle.lua depends on (ioport.cpp, 0.289):
//   * a digital set_value is sampled by the ioport frame update, a notifier
//     that runs before the script's, so a press in notifier N is read from
//     frame N + 2; a PORT_TOGGLE field flips on that sampled press, but the
//     update folds toggles into the port before it updates the fields, so the
//     flip is read from the update after;
//   * an analog set_value is returned by read() as it stands, so a value set in
//     notifier N is read during frame N + 1.
// Our side is driven the way runGameAcceptance drives it: a key goes down at
// its frame, stays down `heldFrames`, then up for `releasedFrames`.

interface Run {
  timeline: Timeline;
  /** Each timeline input's port bits, by frame, as ours read them. */
  ours: number[][];
  readings: string;
}

function runOurs(bindings: FieldBinding[], ports: PortSpec[], actions: GameInputAction[], last: number): Run {
  const input = new KeyboardInput(bindings, [], ports);
  const timeline = inputTimeline(actions, bindings);
  const recorder = new InputRecorder(timeline, bindings, input);
  const frames: Map<string, number>[] = [];
  let frame = 0;
  const run = () => {
    input.advance();
    frame++;
    frames[frame] = new Map(ports.map(port => [port.tag, input.peek(port.tag)]));
    recorder.frame(frame);
  };
  const keys = (codes: string[], down: boolean) => {
    for (const binding of bindings.filter(candidate => candidate.keys.some(key => codes.includes(key)))) {
      input.press(binding, down, codes.find(code => binding.keys.includes(code)));
    }
  };
  for (const action of actions) {
    while (frame < action.atFrame) run();
    if ('aim' in action) {
      for (const binding of bindings.filter(candidate => candidate.lightgun)) {
        input.set(binding, action.aim[binding.lightgun!.axis === 'x' ? 0 : 1]);
      }
      continue;
    }
    if (!('code' in action || 'codes' in action)) throw new Error('the spec drives keys and aims only');
    const codes = 'code' in action ? [action.code] : action.codes;
    keys(codes, true);
    for (let held = 0; held < action.heldFrames; held++) run();
    keys(codes, false);
    for (let released = 0; released < action.releasedFrames; released++) run();
  }
  while (frame < last) run();
  const ours = timeline.inputs.map(entry =>
    Array.from({ length: last + 1 }, (_, at) => at ? frames[at]!.get(entry.port)! & entry.mask : 0));
  return { timeline, ours, readings: recorder.readings() };
}

/** MAME's read of each timeline input, by frame, from the events oracle.lua applies. */
function runMame(timeline: Timeline, bindings: FieldBinding[], ports: PortSpec[], last: number, mameRest: Record<string, number>): number[][] {
  const events = luaEvents(timeline);
  const init = (tag: string) => ports.find(port => port.tag === tag)!.init;
  const fields = timeline.inputs.map(entry => {
    const binding = bindings.find(candidate => candidate.port === entry.port && candidate.mask === entry.mask)!;
    return { entry, binding, override: undefined as number | undefined, digital: false, last: false, toggled: false, folded: false };
  });
  const read = fields.map(() => [0]);
  for (let notifier = 0; notifier < last; notifier++) {
    // MAME's ioport frame update: every digital field samples its set_value.
    if (notifier > 0) {
      for (const field of fields) {
        field.folded = field.toggled;
        if (field.binding.toggle && field.digital && !field.last) field.toggled = !field.toggled;
        field.last = field.digital;
      }
    }
    for (const event of events[notifier] ?? []) {
      if (!('input' in event)) continue;
      const field = fields[event.input - 1]!;
      if (event.kind === 'press') field.digital = true;
      if (event.kind === 'release') field.digital = false;
      if (event.kind === 'set') field.override = event.value;
    }
    fields.forEach((field, index) => {
      const { entry, binding } = field;
      const rest = (mameRest[entry.port] ?? init(entry.port)) & entry.mask;
      const on = binding.toggle ? field.folded : field.last;
      const pressed = binding.activeLow ? 0 : entry.mask;
      read[index]![notifier + 1] = entry.analog
        ? field.override === undefined ? rest : field.override & entry.mask
        : on ? pressed : rest;
    });
  }
  return read;
}

function mirrored(
  name: string, bindings: FieldBinding[], ports: PortSpec[], actions: GameInputAction[], last = 60,
  /** Where MAME's own input rests, when it is not where ours does. */
  mameRest: Record<string, number> = {},
): Run {
  const ours = runOurs(bindings, ports, actions, last);
  assert.ok(ours.timeline.inputs.length, `${name}: something was driven`);
  const mame = runMame(ours.timeline, bindings, ports, last, mameRest);
  ours.timeline.inputs.forEach((entry, index) => {
    for (let frame = 1; frame <= last; frame++) {
      assert.equal(mame[index]![frame], ours.ours[index]![frame],
        `${name}: ${entry.port} 0x${entry.mask.toString(16)} at frame ${frame}`);
    }
  });
  // Moving, not standing still: the run saw the control travel.
  assert.ok(ours.ours.some(values => new Set(values.slice(1)).size > 1), `${name}: the control moved`);
  return ours;
}

const key = (atFrame: number, code: string, heldFrames: number, releasedFrames = 0): GameInputAction =>
  ({ atFrame, code, heldFrames, releasedFrames });

// Pedal (spyhunt): PORT_MINMAX(0x30,0xff) PORT_KEYDELTA(10), ramping from idle.
const pedal = mirrored('pedal', [
  { port: 'ssio:IP2', mask: 0xff, keys: ['ArrowUp'], label: 'Pedal', type: 'IPT_PEDAL', activeValue: 0xff, keyDelta: 10 },
], [{ tag: 'ssio:IP2', init: 0x30 }], [key(5, 'ArrowUp', 30, 10)]);
assert.deepEqual(pedal.timeline.inputs, [{ port: 'ssio:IP2', mask: 0xff, analog: true }]);
// One value per frame it moves, on the frame before the one that reads it.
assert.deepEqual(pedal.timeline.events[5], [{ kind: 'set', input: 0, value: 0x3a }]);
assert.equal(pedal.timeline.events[4], undefined);

// Paddle (spyhunt's wheel, both ways; the NES Vaus stays where it is put).
mirrored('paddle', [
  { port: 'ssio:IP2.ALT', mask: 0xff, keys: ['ArrowLeft'], label: 'Left', type: 'IPT_PADDLE_LEFT', activeValue: 0x34, keyDelta: 10 },
  { port: 'ssio:IP2.ALT', mask: 0xff, keys: ['ArrowRight'], label: 'Right', type: 'IPT_PADDLE_RIGHT', activeValue: 0xb4, keyDelta: 10 },
], [{ tag: 'ssio:IP2.ALT', init: 0x74 }], [key(3, 'ArrowLeft', 8, 4), key(20, 'ArrowRight', 12, 2)]);
const vaus = mirrored('Vaus', [
  { port: 'ctrl2:PADDLE', mask: 0x1ff, keys: ['ArrowRight'], label: 'Right', type: 'IPT_PADDLE_RIGHT', activeValue: 0x1f8, keyDelta: 35, centerDelta: 0 },
], [{ tag: 'ctrl2:PADDLE', init: 0x130 }], [key(2, 'ArrowRight', 3, 0)]);
assert.equal(vaus.ours[0]![60], 0x130 + 3 * 35, 'a Vaus paddle stays where it was left');

// Analog stick (sinistar's 49-way, X and Y).
mirrored('stick', [
  { port: '49WAYX', mask: 0xff, keys: ['ArrowLeft'], label: 'X Left', type: 'IPT_AD_STICK_X_LEFT', activeValue: 0, keyDelta: 10 },
  { port: '49WAYX', mask: 0xff, keys: ['ArrowRight'], label: 'X Right', type: 'IPT_AD_STICK_X_RIGHT', activeValue: 0x6f, keyDelta: 10 },
  { port: '49WAYY', mask: 0xff, keys: ['ArrowUp'], label: 'Y Up', type: 'IPT_AD_STICK_Y_UP', activeValue: 0x6f, keyDelta: 10 },
], [{ tag: '49WAYX', init: 0x38 }, { tag: '49WAYY', init: 0x38 }],
[{ atFrame: 4, codes: ['ArrowRight', 'ArrowUp'], heldFrames: 9, releasedFrames: 3 }, key(20, 'ArrowLeft', 2, 0)]);

// Dial (arkanoid): a counter, not a gesture. A tap moves it on its own frame.
const dial = mirrored('dial', [
  { port: 'P1', mask: 0xff, keys: ['ArrowLeft'], label: 'IPT_DIAL_LEFT', type: 'IPT_DIAL_LEFT', relativeDelta: -15 },
  { port: 'P1', mask: 0xff, keys: ['ArrowRight'], label: 'IPT_DIAL_RIGHT', type: 'IPT_DIAL_RIGHT', relativeDelta: 15 },
], [{ tag: 'P1', init: 0 }], [key(3, 'ArrowLeft', 4, 2), key(12, 'ArrowRight', 1, 0)]);
// Its first frame carries the press's own travel and a frame of ramp (#128).
assert.equal(dial.ours[0]![4], 0xe2, 'the dial wraps below zero, as the driver reads it');

// Trackball (missile): a 4-bit counter, wrapping inside its mask. Were MAME's
// own rest elsewhere than ours, it is given ours from the first frame, before
// the control moves, so the difference never reaches the comparison.
const trackball = mirrored('trackball', [
  { port: 'TRACK0_X', mask: 0x0f, keys: ['ArrowLeft'], label: 'X Left', type: 'IPT_TRACKBALL_X_LEFT', relativeDelta: -10 },
  { port: 'TRACK0_Y', mask: 0x0f, keys: ['ArrowUp'], label: 'Y Up', type: 'IPT_TRACKBALL_Y_UP', relativeDelta: 10 },
], [{ tag: 'TRACK0_X', init: 0 }, { tag: 'TRACK0_Y', init: 0 }], [key(2, 'ArrowLeft', 5, 1), key(10, 'ArrowUp', 3, 0)], 60,
{ TRACK0_Y: 0x0f });
assert.deepEqual(trackball.timeline.events[0], [
  { kind: 'set', input: 0, value: 0 }, { kind: 'set', input: 1, value: 0 },
]);

// Toggle (defender's Auto Up / Manual Down): a press each way, flipped by MAME.
const toggle = mirrored('toggle', [
  { port: 'IN2', mask: 0x01, keys: ['F1'], label: 'Auto Up / Manual Down', type: 'IPT_SERVICE1', activeLow: false, toggle: true },
], [{ tag: 'IN2', init: 0 }], [key(5, 'F1', 1, 10), key(30, 'F1', 3, 0)]);
assert.deepEqual(toggle.timeline.inputs, [{ port: 'IN2', mask: 0x01 }], 'a toggle is pressed, never set');
// Pressed for frame 6, shown from frame 7, as MAME shows it.
assert.deepEqual(toggle.ours[0]!.slice(5, 9), [0, 0, 1, 1]);

// Light gun: the aim our side read, a frame after it was given.
mirrored('light gun', [
  { port: 'ctrl2:GUN_X', mask: 0xff, keys: [], label: 'X', lightgun: { axis: 'x', min: 0, max: 255 } },
  { port: 'ctrl2:GUN_Y', mask: 0xff, keys: [], label: 'Y', lightgun: { axis: 'y', min: 0, max: 239 } },
], [{ tag: 'ctrl2:GUN_X', init: 0 }, { tag: 'ctrl2:GUN_Y', init: 0 }], [{ atFrame: 7, aim: [128, 100] }]);

// The read-back comparison: the files the two sides write agree when MAME
// read what ours did, and name the first frame and port when it did not.
const dir = mkdtempSync(join(tmpdir(), 'oracle-inputs-'));
try {
  writeFileSync(join(dir, 'ours-inputs.txt'), toggle.readings);
  writeFileSync(join(dir, 'mame-inputs.txt'), toggle.readings);
  assert.deepEqual(compareInputs(dir, toggle.timeline.inputs, 60), { inputs: 1, frames: 60, differing: 0 });
  // MAME a frame late: the flip shows on frame 8, not 7.
  writeFileSync(join(dir, 'mame-inputs.txt'), toggle.readings.replace(/^7 0 1$/m, '8 0 1'));
  assert.deepEqual(compareInputs(dir, toggle.timeline.inputs, 60), {
    inputs: 1, frames: 60, differing: 1,
    firstDivergence: { frame: 7, port: 'IN2', mask: 1, mame: 0, ours: 1 },
  });
  assert.equal(compareInputs(dir, [], 60), undefined, 'nothing driven, nothing compared');
} finally {
  rmSync(dir, { recursive: true, force: true });
}

console.log('oracle input-mirror.spec: ok');
