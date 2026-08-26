import assert from 'node:assert/strict';
import { compileTms5220, generatedTms5220CoreSource } from './tms5220-compiler.ts';
import type { MameHardwareDefinition } from './hardware.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';
const plan = compileTms5220(mameSrc, {
  type: 'TMS5220C',
  className: 'tms5220c_device',
  sourceFile: 'src/devices/sound/tms5220.cpp',
} as MameHardwareDefinition);

// The frame format. Energy and pitch widths decide where every later field
// starts, so one wrong width desynchronises the whole bitstream and the chip
// speaks noise rather than words.
assert.equal(plan.numK, 10);
assert.equal(plan.energyBits, 4);
assert.equal(plan.pitchBits, 6);
assert.deepEqual(plan.kBits, [5, 5, 4, 4, 4, 4, 4, 3, 3, 3]);

// Each ladder is exactly as long as its field is wide.
assert.equal(plan.energyTable.length, 1 << plan.energyBits);
assert.equal(plan.pitchTable.length, 1 << plan.pitchBits);
assert.deepEqual(
  plan.kTable.map(row => row.length),
  plan.kBits.map(bits => 1 << bits),
);

// Spot values straight out of tms5110r.hxx: the energy ladder's shape and the
// first reflection coefficient, which is the most audible of the ten.
assert.deepEqual(
  plan.energyTable,
  [0, 1, 2, 3, 4, 6, 8, 11, 16, 23, 33, 47, 63, 85, 114, 0],
);
assert.equal(plan.pitchTable[0], 0);
assert.deepEqual(plan.kTable[0]!.slice(0, 4), [-501, -498, -497, -495]);

// The chirp is 52 entries and MAME clamps the excitation index at 51; a
// shorter table would read undefined past the end of every voiced frame.
assert.equal(plan.chirpTable.length, 52);
assert.equal(plan.chirpTable[0], 0);

// Interpolation shifts per period, and the 5220C rate reload.
assert.deepEqual(plan.interpCoeff, [0, 3, 3, 3, 2, 2, 1, 1]);
assert.deepEqual(plan.reloadTable, [0, 2, 4, 6]);

// Timing and variant facts.
assert.equal(plan.fifoSize, 16);
assert.equal(plan.clockDivider, 80);
assert.equal(plan.readyClocks, 16);
assert.equal(plan.subcycleReload, 1);
assert.equal(plan.hasRateControl, true, 'the C variant takes a rate command');
// MAME builds with FAST_START_HACK on and FORCE_DIGITAL off, so speech starts
// as soon as SPEN rises and the output is the clipped analog SPK pin.
assert.equal(plan.fastStart, true);
assert.equal(plan.forceDigital, false);

// A non-C variant reads the same tables but loses the rate command.
const plain = compileTms5220(mameSrc, {
  type: 'TMS5220',
  className: 'tms5220_device',
  sourceFile: 'src/devices/sound/tms5220.cpp',
} as MameHardwareDefinition);
assert.equal(plain.hasRateControl, false);
assert.deepEqual(plain.energyTable, plan.energyTable);

const source = generatedTms5220CoreSource(plan);
assert.match(source, /GENERATED from src\/devices\/sound\/tms5220\.cpp:\d+/);
assert.match(source, /export class GeneratedTms5220Core/);

console.log('tms5220-compiler.spec: frame format, coefficient ladders and timing passed');
