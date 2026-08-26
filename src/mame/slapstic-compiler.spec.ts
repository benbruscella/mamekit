import assert from 'node:assert/strict';
import { compileMameHandler } from './handler-ir.ts';
import { lowerSlapstic, parseSlapsticTables, slapsticDeviceTables } from './slapstic-compiler.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';
const tables = parseSlapsticTables(mameSrc);

// slapstic_table[] is indexed by chip number minus 101 and MAME leaves a
// nullptr where a number was never seen in the wild, so the hole has to
// survive parsing: shifting it up renumbers every chip after it.
assert.equal(tables.order[0], 101);
assert.equal(tables.order[1], undefined);
assert.equal(tables.order[3], 104);
assert.equal(tables.order.at(-1), 118);

// The mask/value field order comes from struct slapstic_data in the header,
// not from a list written here; the initializers are positional.
assert.deepEqual(tables.maskFields, [
  'alt1', 'alt2', 'alt3', 'alt4',
  'bit1', 'bit2', 'bit3c0', 'bit3s0', 'bit3c1', 'bit3s1', 'bit4',
  'add1', 'add2', 'addplus1', 'addplus2', 'add3',
]);

// Gauntlet's 137412-104, read straight off slapstic.cpp.
const gauntlet = tables.chips.find(chip => chip.chipnum === 104);
assert.ok(gauntlet);
assert.equal(gauntlet.bankstart, 3);
assert.deepEqual(gauntlet.bank, [0x0020, 0x0028, 0x0030, 0x0038]);
assert.equal(gauntlet.altshift, 0);
assert.deepEqual(gauntlet.masks.alt1, { mask: 0x007f, value: 0x0069 });
assert.deepEqual(gauntlet.masks.alt3, { mask: 0x3ffc, value: 0x3764 });
assert.deepEqual(gauntlet.masks.bit3s1, { mask: 0x3ff3, value: 0x3d93 });
// 104 has no additive banking, so NO_ADDITIVE must expand to UNKNOWN pairs
// rather than being read as a missing field and shifting the table.
assert.deepEqual(gauntlet.masks.add1, { mask: 0xffff, value: 0xffff });

// 111 is the reverse case: additive banking present, NO_BITWISE in the middle.
const chip111 = tables.chips.find(chip => chip.chipnum === 111);
assert.ok(chip111);
assert.equal(chip111.bankstart, 0);
assert.deepEqual(chip111.masks.bit1, { mask: 0xffff, value: 0xffff });
assert.deepEqual(chip111.masks.addplus1, { mask: 0x3c4f, value: 0x284d });

// 101 is the only chip with 13 address lines and the only one whose bank
// values are a nibble apart; it is also the one MAME builds different state
// objects for, so keep its table honest.
const chip101 = tables.chips.find(chip => chip.chipnum === 101);
assert.ok(chip101);
assert.deepEqual(chip101.bank, [0x0080, 0x0090, 0x00a0, 0x00b0]);

const flat = slapsticDeviceTables(tables);
assert.equal(flat.chipCount, 18);
assert.equal(flat.maskCount, tables.maskFields.length);
assert.equal(flat.bankstart.length, 18);
assert.equal(flat.bank.length, 18 * 4);
assert.equal(flat.mask.length, 18 * flat.maskCount);
// The nullptr slot is still a slot: chip 104 must sit at index 3.
assert.equal(flat.bankstart[3], 3);
assert.deepEqual(flat.bank.slice(3 * 4, 4 * 4), [0x0020, 0x0028, 0x0030, 0x0038]);
assert.equal(flat.mask[3 * flat.maskCount + flat.fieldConstants.MV_ALT1!], 0x007f);
assert.equal(flat.value[3 * flat.maskCount + flat.fieldConstants.MV_ALT1!], 0x0069);

const lowering = lowerSlapstic(mameSrc);
// Every synthesized method has to lower cleanly or the capability drops the
// whole device and the bank silently stays on entry 0.
for (const method of lowering.methods) {
  assert.deepEqual(
    compileMameHandler(method.body).diagnostics,
    [],
    `${method.name} must lower without diagnostics`,
  );
}
assert.deepEqual(
  lowering.methods.map(method => method.name).sort(),
  ['compute_tests', 'configure_range', 'set_test_any', 'set_test_in', 'test', 'tmatch'],
);

// The predicate slots and the mask_value columns share one constant scope in
// the emitted device, so a collision would silently retarget a test.
const names = Object.keys(lowering.constants);
assert.equal(new Set(names).size, names.length);
for (const field of tables.maskFields) {
  assert.ok(`MV_${field.toUpperCase()}` in lowering.constants);
}

console.log('slapstic-compiler.spec: chip tables, flat layout and lowered methods passed');
