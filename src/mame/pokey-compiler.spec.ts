import assert from 'node:assert/strict';
import {
  compilePokey,
  generatedPokeyCoreSource,
  generatedPokeyWorkletSource,
} from './pokey-compiler.ts';
import type { MameHardwareDefinition } from './hardware.ts';

const mameSrc = process.env.MAME_SRC ?? '../mame';
const plan = compilePokey(mameSrc, {
  type: 'POKEY',
  className: 'pokey_device',
  sourceFile: 'src/devices/sound/pokey.cpp',
} as MameHardwareDefinition);

// The write-register map is the enum in pokey.h. A shifted offset silently
// routes a frequency write into a control register and detunes a channel.
assert.equal(plan.registers.AUDF1_C, 0x00);
assert.equal(plan.registers.AUDC1_C, 0x01);
assert.equal(plan.registers.AUDCTL_C, 0x08);
assert.equal(plan.registers.STIMER_C, 0x09);
assert.equal(plan.registers.SKCTL_C, 0x0f);

// Distortion and volume bitfields.
assert.deepEqual(plan.audc, {
  NOTPOLY5: 0x80, POLY4: 0x40, PURE: 0x20, VOLUME_ONLY: 0x10, VOLUME_MASK: 0x0f,
});
assert.equal(plan.audctl.CLK_15KHZ, 0x01);
assert.equal(plan.audctl.CH12_JOINED, 0x10);
assert.equal(plan.audctl.POLY9, 0x80);

// The two prescalers, from the divisors MAME names rather than from the
// nominal 64 kHz and 15 kHz the comments quote.
assert.equal(plan.div64, 28);
assert.equal(plan.div15, 114);

// POKEY_DEFAULT_GAIN is `(32767/11/4)`, and C evaluates that in integers:
// reading it as floating point makes every channel 0.1% loud in the wrong
// direction and, worse, stops the four-channel sum clipping where MAME's does.
assert.equal(plan.defaultGain, 744);
assert.equal(plan.defaultGain, Math.trunc(Math.trunc(32767 / 11) / 4));

// Polynomial taps. These are the tone colours: a wrong tap is a wrong timbre
// on every noise channel the chip has.
assert.deepEqual(plan.poly4, { size: 4, taps: [2, 3] });
assert.deepEqual(plan.poly5, { size: 5, taps: [2, 4] });
assert.deepEqual(plan.poly9, { size: 9, taps: [0, 5] });
assert.deepEqual(plan.poly17, { size: 17, taps: [8, 13] });

// The emitted engine carries its provenance and the plan it was built from.
const source = generatedPokeyCoreSource(plan);
assert.match(source, /GENERATED from src\/devices\/sound\/pokey\.cpp:\d+/);
const worklet = generatedPokeyWorkletSource(plan);
assert.match(worklet, /export class GeneratedPokeyFrameRenderer/);
assert.match(worklet, /registerProcessor\('pokey', GeneratedPokeyProcessor\)/);
assert.match(source, /export class GeneratedPokeyCore/);
assert.ok(source.includes('"defaultGain": 744'));

console.log('pokey-compiler.spec: registers, bitfields, prescalers and poly taps passed');
