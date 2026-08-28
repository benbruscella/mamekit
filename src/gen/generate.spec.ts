import assert from 'node:assert/strict';
import { fieldConditionHolds, handlerOwnsSharedRam, keypadKeys } from './generate.ts';

assert.equal(
  handlerOwnsSharedRam(
    'm_screen->update_partial(m_screen->vpos());\nm_spriteram[offset] = data;',
    'spriteram',
  ),
  true,
);
assert.equal(
  handlerOwnsSharedRam(
    'm_videoram[offset] = data;\nm_tilemap->mark_tile_dirty(offset);',
    'videoram',
  ),
  true,
);
assert.equal(handlerOwnsSharedRam('palette.write8(offset, data);', 'palette'), false);
assert.equal(handlerOwnsSharedRam('m_spriteram[offset] = data;', ''), false);

// --- keypad keys ------------------------------------------------------------
//
// Every key of a MAME keypad shares one IPT type, so the label is the only
// thing that says which key it is. The ColecoVision names them "0 (pad 1)"
// through "9 (pad 1)" plus "*" and "#".
assert.deepEqual(keypadKeys('0'), ['Digit0', 'Numpad0']);
assert.deepEqual(keypadKeys('7 (pad 1)'), ['Digit7', 'Numpad7']);
assert.deepEqual(keypadKeys('  3 (SAC pad 2)'), ['Digit3', 'Numpad3']);
// `#` and `*` have no word character after them, so a \b-anchored match never
// saw them and the ColecoVision silently lost two of its twelve keys.
assert.deepEqual(keypadKeys('# (pad 1)'), ['NumpadSubtract', 'Equal']);
assert.deepEqual(keypadKeys('*'), ['NumpadMultiply', 'Minus']);
// A field that is not a keypad key at all yields nothing to bind.
assert.equal(keypadKeys('Purple Action Button P1'), undefined);
assert.equal(keypadKeys(undefined), undefined);
assert.equal(keypadKeys('10'), undefined, 'a two-digit label is not one key');

// --- PORT_CONDITION ---------------------------------------------------------
//
// MAME hangs alternate controllers off the same ports and marks each field
// with the selector value it belongs to. coleco.cpp defaults CTRLSEL to 0x00
// (the standard pad), so the Super Action Controller's fields must not bind --
// binding them all at once put "purple action button" on a key the standard
// pad already used.
{
  const ctrlsel = new Map([['CTRLSEL', 0x00]]);
  assert.equal(fieldConditionHolds([], ctrlsel), true, 'an unconditioned field always holds');
  assert.equal(
    fieldConditionHolds(['PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x00)'], ctrlsel),
    true,
    'the standard controller is what the default selects',
  );
  assert.equal(
    fieldConditionHolds(['PORT_CONDITION("CTRLSEL", 0x07, EQUALS, 0x02)'], ctrlsel),
    false,
    'the Super Action Controller is not connected',
  );
  assert.equal(
    fieldConditionHolds(['PORT_CONDITION("CTRLSEL", 0x07, NOTEQUALS, 0x00)'], ctrlsel),
    false,
  );
  // A selector the machine does not configure leaves the field as MAME leaves
  // it, so a driver whose condition names an absent port keeps its controls.
  assert.equal(
    fieldConditionHolds(['PORT_CONDITION("MISSING", 0x07, EQUALS, 0x02)'], ctrlsel),
    true,
  );
  // Port 2's selector is its own nibble, and its default selects the pad too.
  assert.equal(
    fieldConditionHolds(['PORT_CONDITION("CTRLSEL", 0x70, EQUALS, 0x00)'], ctrlsel),
    true,
  );
}

console.log('generate.spec: shared RAM ownership, keypad keys and port conditions passed');
