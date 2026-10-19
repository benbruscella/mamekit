// The natural keyboard types through a machine's own keys exactly as MAME's
// does: which key and which shift come from each key's PORT_CHARs, and the
// pacing is MAME's -- a step every 50 ms of emulated time (200 ms on a
// carriage return), the shift key one step before the key, all released
// together.

import assert from 'node:assert/strict';
import type { FieldBinding } from './input.ts';
import { NaturalKeyboard } from './natural-keyboard.ts';

const key = (label: string, chars: string[][]): FieldBinding =>
  ({ port: 'ROW', mask: 1, keys: [], label, type: 'IPT_KEYBOARD', activeLow: true, chars });

const shift = key('Shift', [['{SHIFT_1}']]);
const two = key('2', [['2'], ['"']]);
const l = key('L', [['L']]);
const enter = key('Return', [['\r']]);
const function1 = key('F1', [['{F1}'], ['{F2}']]);
const bindings = [shift, two, l, enter, function1];

/** Run frames of `seconds` until the queue drains, logging every edge with its frame. */
function typed(text: string, coded = false, seconds = 0.02): [number, string, boolean][] {
  const edges: [number, string, boolean][] = [];
  let frame = 0;
  const keyboard = new NaturalKeyboard(
    { press: (binding, down) => { edges.push([frame, binding.label, down]); } },
    bindings,
    { l: 'L' },
  );
  if (coded) keyboard.postCoded(text);
  else keyboard.post(text);
  for (; keyboard.busy() && frame < 1000; frame++) keyboard.tick(seconds);
  return edges;
}

// An unshifted key: pressed one step after posting, released a step later.
assert.deepEqual(typed('L'), [[2, 'L', true], [5, 'L', false]]);

// A shifted character presses its shift key a step before the key and lets go
// of both together.
assert.deepEqual(typed('"'), [
  [2, 'Shift', true], [5, '2', true],
  [7, 'Shift', false], [7, '2', false],
]);

// A carriage return paces at 200 ms; a newline is one; lowercase is typed
// through MAME's alternates table as the uppercase key.
assert.deepEqual(typed('l\n'), [
  [2, 'L', true], [5, 'L', false],
  [15, 'Return', true], [25, 'Return', false],
]);

// MAME's coded form names keys that type no character, and a key's second
// shift state is reached the same way as a shifted character.
assert.deepEqual(typed('{ENTER}', true), [[10, 'Return', true], [20, 'Return', false]]);
assert.deepEqual(typed('', true), []);
{
  const edges: string[] = [];
  const keyboard = new NaturalKeyboard({ press: (binding, down) => { edges.push(`${binding.label}${down ? '+' : '-'}`); } }, bindings);
  keyboard.postCoded('{F2}');
  for (let frame = 0; keyboard.busy() && frame < 100; frame++) keyboard.tick(0.02);
  assert.deepEqual(edges, ['Shift+', 'F1+', 'Shift-', 'F1-']);
  // A character no key types, with no alternate, is dropped rather than queued.
  keyboard.post('Q');
  assert.equal(keyboard.busy(), false);
}

// Never more than one step a frame, so even a long frame shows every press.
assert.deepEqual(typed('L', false, 0.25), [[0, 'L', true], [1, 'L', false]]);

// Cancelling lets go of anything it holds.
{
  const held = new Set<string>();
  const keyboard = new NaturalKeyboard({
    press: (binding, down) => { if (down) held.add(binding.label); else held.delete(binding.label); },
  }, bindings);
  keyboard.post('""');
  for (let frame = 0; frame < 6; frame++) keyboard.tick(0.02);
  assert.deepEqual([...held].sort(), ['2', 'Shift']);
  keyboard.cancel();
  assert.deepEqual([...held], []);
  assert.equal(keyboard.busy(), false);
}

// What the machine has no key for is dropped, as MAME drops it; a start
// command or a test asks first, coded escapes and alternates included.
{
  const keyboard = new NaturalKeyboard({ press: () => {} }, bindings, { l: 'L' });
  assert.deepEqual(keyboard.untypable('L"l{ENTER}{F2}'), []);
  assert.deepEqual(keyboard.untypable('LOAD{F9}'), ['O', 'A', 'D', '{F9}']);
}

console.log('natural-keyboard.spec: MAME key combinations, pacing, alternates and untypable text passed');
