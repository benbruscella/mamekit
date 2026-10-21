// The on-screen keyboard's layout, from a machine's own key bindings: each
// cap's legend from what MAME says the key types or calls it, each key's place
// from the PC key MAME's PORT_CODE puts it on, and the machine's own keys on a
// row of theirs.

import assert from 'node:assert/strict';
import type { FieldBinding } from './input.ts';
import { keyLegend, onscreenLayout } from './onscreen-keyboard.ts';

const key = (label: string, keys: string[], chars?: string[][], port = 'ROW0'): FieldBinding =>
  ({ port, mask: 1, keys, label, type: 'IPT_KEYBOARD', activeLow: true, ...(chars ? { chars } : {}) });

// The C64's own keys, as its generated bindings carry them: MAME's names and
// characters, on the PC keys its PORT_CODEs choose (RUN STOP, CTRL and RESTORE
// on the host's own keys for Esc, Control and Tab).
const bindings = [
  key('RUN STOP', ['F9']),
  key('F5', ['F3'], [['{F5}']]),
  key('F1', ['F1'], [['{F1}']]),
  key('INST DEL', ['Backspace'], [['\b'], ['{INSERT}']]),
  key('CRSR ↑ ↓', ['ArrowDown'], [['{DOWN}'], ['{UP}']]),
  key('Return', ['Enter'], [['\r']]),
  key('1', ['Digit1', 'Numpad1'], [['1'], ['!']]),
  key('+', ['Minus'], [['+']]),
  key('@', ['BracketLeft'], [['@']]),
  key('Q', ['KeyQ'], [['Q']]),
  key('A', ['KeyA'], [['A']]),
  key('Z', ['KeyZ'], [['Z']]),
  key(',', ['Comma'], [[','], ['<']]),
  key('£', ['PageDown'], [['£']]),
  key('Shift (Left)', ['ShiftLeft'], [['{SHIFT_1}']]),
  key('CBM', ['AltLeft']),
  key('CTRL', ['Pause'], [['{LCONTROL}']]),
  key('SHIFT LOCK', ['CapsLock'], [['{CAPSLOCK}']]),
  key('Space', ['Space'], [[' ']]),
  { ...key('Up', ['ArrowUp']), type: 'IPT_JOYSTICK_UP' },
];

assert.deepEqual(keyLegend(bindings[1]!), { legend: 'F5' }, 'a function key reads as the key it is');
// The Spectrum's names lay every mode's legend out in columns: the cap keeps
// the rest, so 48K BASIC's keywords are on the keys it is typed with.
assert.deepEqual(
  keyLegend(key('j    J    -      VAL      VAL$     LOAD', ['KeyJ'], [['j'], ['J'], ['-']])),
  { legend: 'J', modes: '- VAL VAL$ LOAD' },
);
assert.deepEqual(keyLegend(key('ENTER', ['Enter'], [['\r']])), { legend: 'ENTER' });
assert.deepEqual(keyLegend(bindings[3]!), { legend: 'INST DEL' }, 'a named key keeps its two-word name');
assert.deepEqual(keyLegend(bindings[6]!), { legend: '1', shifted: '!' });
assert.deepEqual(keyLegend(bindings[12]!), { legend: ',', shifted: '<' });
assert.deepEqual(keyLegend(bindings[16]!), { legend: 'CTRL' }, 'a key MAME names reads as named, not as its key code');
assert.deepEqual(keyLegend(bindings[0]!), { legend: 'RUN STOP' }, 'a key that types nothing keeps its name');

const rows = onscreenLayout(bindings);
const legends = rows.map(row => row.map(entry => entry.legend));
assert.deepEqual(legends[0], ['F1', 'F5', 'RUN STOP', 'CRSR ↑ ↓', '£'],
  'the machine\'s own keys, function keys first and in order, then as the driver declares them');
assert.deepEqual(legends.slice(1, 5), [['1', '+', 'INST DEL'], ['Q', '@'], ['SHIFT LOCK', 'A', 'RETURN'], ['SHIFT (LEFT)', 'Z', ',']],
  'each key where MAME put it on the PC: + after the digits, @ after Q\'s row, SHIFT LOCK and the shifts at the ends');
assert.deepEqual(legends[5], ['CBM', 'CTRL', 'SPACE'], 'the space bar and the modifiers on no typing key along the bottom');
assert.deepEqual(rows[5]!.map(entry => entry.kind), ['modifier', 'modifier', 'key']);
assert.equal(rows[3]![0]!.kind, 'lock');
assert.ok(!rows.flat().some(entry => entry.binding.type !== 'IPT_KEYBOARD'), 'a joystick is no key');

console.log('onscreen-keyboard.spec: legends, rows and modifiers passed');
