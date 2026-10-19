// The on-screen keyboard's layout, from a machine's own key bindings: each
// cap's legend from what MAME says the key types or calls it, each key's row
// from the characters it types, and the machine's own keys on a row of theirs.

import assert from 'node:assert/strict';
import type { FieldBinding } from './input.ts';
import { keyLegend, onscreenLayout } from './onscreen-keyboard.ts';

const key = (label: string, chars?: string[][], port = 'ROW0'): FieldBinding =>
  ({ port, mask: 1, keys: [], label, type: 'IPT_KEYBOARD', activeLow: true, ...(chars ? { chars } : {}) });

// The C64's own spellings, as its generated bindings carry them.
const bindings = [
  key('RUN STOP'),
  key('F3', [['{F5}']]),
  key('INST DEL', [['\b'], ['{INSERT}']]),
  key('CRSR ↑ ↓', [['{DOWN}'], ['{UP}']]),
  key('Return', [['\r']]),
  key('1', [['1'], ['!']]),
  key('Q', [['Q']]),
  key('A', [['A']]),
  key('Z', [['Z']]),
  key('Comma', [[','], ['<']]),
  key('PageDown', [['£']]),
  key('Shift (Left)', [['{SHIFT_1}']]),
  key('CBM'),
  key('SHIFT LOCK', [['{CAPSLOCK}']]),
  key('Space', [[' ']]),
  { ...key('Up'), type: 'IPT_JOYSTICK_UP' },
];

assert.deepEqual(keyLegend(bindings[1]!), { legend: 'F5' }, 'a coded key reads as MAME names it, not as the PC key it sits on');
assert.deepEqual(keyLegend(bindings[2]!), { legend: 'INST DEL' }, 'a named key keeps its two-word name');
assert.deepEqual(keyLegend(bindings[5]!), { legend: '1', shifted: '!' });
assert.deepEqual(keyLegend(bindings[9]!), { legend: ',', shifted: '<' }, 'a symbol key shows its symbol, not the PC code name');
assert.deepEqual(keyLegend(bindings[0]!), { legend: 'RUN STOP' }, 'a key that types nothing keeps its name');

const rows = onscreenLayout(bindings);
const legends = rows.map(row => row.map(entry => entry.legend));
assert.deepEqual(legends[0], ['RUN STOP', 'F5', 'INST DEL', 'CRSR ↑ ↓', 'RETURN', '£'],
  'the machine\'s own keys, in the driver\'s order, before the QWERTY rows');
assert.deepEqual(legends.slice(1, 5), [['1'], ['Q'], ['A'], ['Z', ',']], 'each typed key on its QWERTY row, in grid order');
assert.deepEqual(legends[5], ['SHIFT (LEFT)', 'CBM', 'SHIFT LOCK', 'SPACE'], 'modifiers and the space bar along the bottom');
assert.deepEqual(rows[5]!.map(entry => entry.kind), ['modifier', 'modifier', 'lock', 'key']);
assert.ok(!rows.flat().some(entry => entry.binding.type !== 'IPT_KEYBOARD'), 'a joystick is no key');

console.log('onscreen-keyboard.spec: legends, rows and modifiers passed');
