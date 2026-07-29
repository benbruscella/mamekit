import assert from 'node:assert/strict';
import { compileYm2203, generatedYm2203WorkletSource } from './opn-compiler.ts';
import type { MameHardwareDefinition } from './hardware.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';
const definition: MameHardwareDefinition = {
  type: 'YM2203',
  className: 'ym2203_device',
  sourceFile: 'src/devices/sound/ymopn.cpp',
  sourceLine: 12,
  sourceColumn: 1,
  macro: '',
};
const plan = compileYm2203(mameSrc, definition);

// Fidelity and prescale: MAME's wrapper selects OPN_FIDELITY_MED, and ymfm's
// update_prescale maps the default prescale of 6 to its FM/SSG rate ratios.
assert.equal(plan.sampleRateDivider, 12);
assert.equal(plan.fmSamplesPerOutput, 6);
assert.deepEqual(plan.ssgResample, [4, 3]);
assert.equal(plan.fm.defaultPrescale, 6);
assert.deepEqual(plan.prescale.selectors, [
  { address: 0x2d, prescale: 6 },
  { address: 0x2e, prescale: 3, requiresPrescale: 6 },
  { address: 0x2f, prescale: 2 },
]);
assert.deepEqual(plan.prescale.ratios, {
  2: { fmSamplesPerOutput: 2, ssgResample: [1, 3] },
  3: { fmSamplesPerOutput: 3, ssgResample: [2, 3] },
  6: { fmSamplesPerOutput: 6, ssgResample: [4, 3] },
});

// OPN geometry and envelope constants.
assert.equal(plan.fm.channels, 3);
assert.equal(plan.fm.operators, 12);
assert.equal(plan.fm.registers, 0x100);
assert.equal(plan.fm.modeRegister, 0x27);
assert.equal(plan.fm.waveformLength, 0x400);
assert.equal(plan.fm.egClockDivider, 3);
assert.equal(plan.fm.egQuiet, 0x380);
assert.deepEqual(
  [plan.fm.egAttack, plan.fm.egDecay, plan.fm.egSustain, plan.fm.egRelease],
  [1, 2, 3, 4],
);
assert.equal(plan.fm.keycodeMagic, 0xfe80);

// OPN interleaves its operators across channels, and channel/operator register
// offsets follow the constexpr formulas for the non-OPNA instantiation.
assert.deepEqual(plan.fm.operatorMap, [[0, 6, 3, 9], [1, 7, 4, 10], [2, 8, 5, 11]]);
assert.deepEqual(plan.fm.channelOffsets, [0, 1, 2]);
assert.deepEqual(plan.fm.operatorOffsets, [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14]);

// Die-extracted tables.
assert.equal(plan.fm.sinTable.length, 256);
assert.deepEqual(plan.fm.sinTable.slice(0, 4), [0x859, 0x6c3, 0x607, 0x58b]);
assert.equal(plan.fm.sinTable.at(-1), 0);
assert.equal(plan.fm.powerTable.length, 256);
// The X(a) macro pre-applies the implied leading bit and the DAC shift.
assert.equal(plan.fm.powerTable[0], (0x3fa | 0x400) << 2);
assert.equal(plan.fm.powerTable.at(-1), (0x000 | 0x400) << 2);
assert.equal(plan.fm.incrementTable.length, 64);
assert.equal(plan.fm.incrementTable[0], 0);
assert.equal(plan.fm.incrementTable[50], 0x21212121);
assert.equal(plan.fm.detuneTable.length, 32);
assert.deepEqual(plan.fm.detuneTable[0], [0, 0, 1, 2]);
assert.deepEqual(plan.fm.detuneTable[16], [0, 2, 5, 8]);

// The ALGORITHM macro packs operator inputs and the final-sum selection.
assert.ok(plan.fm.algorithmOps.length >= 8);
const algorithm = (op2in: number, op3in: number, op4in: number,
  op1out: number, op2out: number, op3out: number): number =>
  op2in | (op3in << 1) | (op4in << 4) | (op1out << 7) | (op2out << 8) | (op3out << 9);
assert.equal(plan.fm.algorithmOps[0], algorithm(1, 2, 3, 0, 0, 0));
assert.equal(plan.fm.algorithmOps[7], algorithm(0, 0, 0, 1, 1, 1));

// SSG engine facts.
assert.equal(plan.ssg.channels, 3);
assert.equal(plan.ssg.registers, 0x10);
assert.equal(plan.ssg.amplitudes.length, 32);
assert.equal(plan.ssg.amplitudes[0], 0);
assert.equal(plan.ssg.amplitudes.at(-1), 16382);
assert.deepEqual(plan.ssg.noiseTaps, [0, 3]);
assert.equal(plan.ssg.noiseFeedbackShift, 17);
assert.equal(plan.ssg.envelopeShapeRegister, 0x0d);

// Register accessors: byte() adds the caller's channel/operator offset to the
// register index, word() reads a most-significant-first pair, and the SSG
// accessors index m_regdata directly with per-channel strides.
assert.deepEqual(plan.fm.fields.ch_algorithm, {
  parts: [{ offset: 0xb0, offsetStride: 1, shift: 0, shiftStride: 0, width: 3 }],
});
assert.deepEqual(plan.fm.fields.ch_block_freq, {
  parts: [
    { offset: 0xa4, offsetStride: 1, shift: 0, shiftStride: 0, width: 6 },
    { offset: 0xa0, offsetStride: 1, shift: 0, shiftStride: 0, width: 8 },
  ],
});
assert.deepEqual(plan.fm.fields.op_total_level, {
  parts: [{ offset: 0x40, offsetStride: 1, shift: 0, shiftStride: 0, width: 7 }],
});
// OPN is the IsOpnA == false instantiation, so multi_freq reads register 0x27.
assert.deepEqual(plan.fm.fields.multi_freq, {
  parts: [{ offset: 0x27, offsetStride: 0, shift: 6, shiftStride: 0, width: 2 }],
});
assert.deepEqual(plan.ssg.fields.envelope_period, {
  parts: [
    { offset: 0x0c, offsetStride: 0, shift: 0, shiftStride: 0, width: 8 },
    { offset: 0x0b, offsetStride: 0, shift: 0, shiftStride: 0, width: 8 },
  ],
});
assert.deepEqual(plan.ssg.fields.ch_tone_period, {
  parts: [
    { offset: 0x01, offsetStride: 2, shift: 0, shiftStride: 0, width: 4 },
    { offset: 0x00, offsetStride: 2, shift: 0, shiftStride: 0, width: 8 },
  ],
});
assert.deepEqual(plan.ssg.fields.ch_amplitude, {
  parts: [{ offset: 0x08, offsetStride: 1, shift: 0, shiftStride: 0, width: 4 }],
});
assert.deepEqual(plan.ssg.fields.ch_noise_enable_n, {
  parts: [{ offset: 0x07, offsetStride: 0, shift: 3, shiftStride: 1, width: 1 }],
});

// Provenance: every consumed ymfm and MAME wrapper file is recorded.
for (const file of [
  'src/devices/sound/ymopn.cpp',
  'src/devices/sound/ymfm_mame.h',
  '3rdparty/ymfm/src/ymfm_opn.cpp',
  '3rdparty/ymfm/src/ymfm_fm.ipp',
  '3rdparty/ymfm/src/ymfm_ssg.cpp',
]) {
  assert.ok(plan.sourceFiles.includes(file), `plan must record ${file}`);
}

// The emitted worklet must be self-contained and carry the whole plan.
const source = generatedYm2203WorkletSource(plan);
assert.match(source, /^\/\/ GENERATED from 3rdparty\/ymfm\/src\/ymfm_opn\.cpp:\d+/);
assert.match(source, /registerProcessor\('ym2203', GeneratedYm2203Processor\)/);
assert.match(source, /export class GeneratedYm2203Mixer/);
assert.match(source, /export class GeneratedYm2203FrameRenderer/);
assert.match(source, /private updatePrescale\(prescale: number\): void/);
assert.match(source, /candidate\.requiresPrescale === this\.prescale/);
assert.ok(!/\bimport\b/.test(source), 'the worklet must not import anything');
assert.ok(source.includes('"sinTable"'), 'the worklet must embed the lowered plan');

console.log('opn-compiler.spec: YM2203 OPN plan lowered from ymfm source passed');
