// What the natural keyboard is generated from: each key's PORT_CHARs, MAME's
// C string escapes in key legends, and the charinfo table of characters MAME
// types another way.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cString, keyName, portChars, portLabel } from './input-bindings.ts';
import { mameCharacterAlternates, naturalKeyboardAlternates } from './natural-keyboard.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';

// MAME writes its legends in UTF-8 byte escapes.
assert.equal(portLabel(['PORT_NAME("CRSR \\xE2\\x86\\x91 \\xE2\\x86\\x93")']), 'CRSR ↑ ↓');
// The Spectrum's X key: a UTF-8 legend and a char32_t pound sign.
assert.equal(portLabel(['PORT_NAME(u8"x    X    £      EXP")']), 'x    X    £      EXP');
assert.deepEqual(portChars(["PORT_CHAR('x')", "PORT_CHAR('X')", "PORT_CHAR(U'£')"]), [['x'], ['X'], ['£']]);
assert.equal(cString('a\\\\b\\"c\\101\\n'), 'a\\b"cA\n');

// One list per shift state, in declaration order; a key with no character is
// MAME's coded spelling of it, a shift key says which it is.
assert.deepEqual(portChars(["PORT_CODE(KEYCODE_2)", "PORT_CHAR('2')", `PORT_CHAR('"')`]), [['2'], ['"']]);
assert.deepEqual(portChars(['PORT_CHAR(UCHAR_MAMEKEY(DOWN))', 'PORT_CHAR(UCHAR_MAMEKEY(UP))']), [['{DOWN}'], ['{UP}']]);
assert.deepEqual(
  portChars(['PORT_CHAR(13)', 'PORT_CHAR(0xA3)', 'PORT_CHAR(UCHAR_SHIFT_1)', "PORT_CHAR(',')", "PORT_CHAR('\\'')", "PORT_CHAR('a', 'A')"]),
  [['\r'], ['£'], ['{SHIFT_1}'], [','], ["'"], ['a', 'A']],
);
assert.equal(portChars(['PORT_CODE(KEYCODE_F1)']), undefined, 'a key MAME gives no character types nothing');

// A key MAME leaves unnamed is named by what it types (ioport_field::key_name):
// the C64's F5 sits on the PC's F3, and is still F5.
assert.equal(keyName(portChars(['PORT_CODE(KEYCODE_F3)', 'PORT_CHAR(UCHAR_MAMEKEY(F5))'])), 'F5');
assert.equal(keyName(portChars(['PORT_CODE(KEYCODE_OPENBRACE)', "PORT_CHAR('@')"])), '@');
assert.equal(keyName(portChars(['PORT_CHAR(UCHAR_MAMEKEY(LCONTROL))'])), 'Left Ctrl');
assert.equal(keyName(portChars(['PORT_CHAR(13)'])), 'Enter');
assert.equal(keyName(portChars(["PORT_CHAR(' ')"])), 'Space');
assert.equal(keyName(undefined), undefined, 'a key that types nothing has no name of its own');

// MAME's own table, read from source; kept per machine to what its keys reach.
const alternates = mameCharacterAlternates(readFileSync(join(mameSrc, 'src/emu/natkeyboard.cpp'), 'utf8'));
assert.ok(alternates.size > 100, `charinfo has ${alternates.size} rows`);
assert.equal(alternates.get('a'), 'A');
assert.equal(alternates.get('\t'), '    ');
const uppercase = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ '].map(ch => ({ type: 'IPT_KEYBOARD', chars: [[ch]] }));
const kept = naturalKeyboardAlternates(mameSrc, uppercase)!;
assert.equal(kept.a, 'A', 'lowercase types as uppercase on a machine without it');
assert.equal(kept.A, undefined, 'a character a key types needs no alternate');
assert.equal(kept['é'], undefined, 'an alternate the keys cannot type (é -> e) is left out');
assert.equal(naturalKeyboardAlternates(mameSrc, [{ type: 'IPT_JOYSTICK_UP' }]), undefined);

console.log('natural-keyboard.spec (gen): PORT_CHARs, legends and MAME alternates passed');
