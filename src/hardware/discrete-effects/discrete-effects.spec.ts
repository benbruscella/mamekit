import assert from 'node:assert/strict';
import type { GeneratedDiscreteEffectsPlan } from '../../ir/audio-protocol.ts';

(globalThis as Record<string, unknown>).AudioWorkletProcessor = class {};
(globalThis as Record<string, unknown>).registerProcessor = () => {};

const { GeneratedDiscreteAudioCore } = await import('./discrete-effects-worklet.ts');

const plan: GeneratedDiscreteEffectsPlan = {
  schemaVersion: 1,
  type: 'DISCRETE_EFFECTS',
  inputNodes: { TRIGGER: 1 },
  dac: { node: 7, gain: 0, filterFrequency: 2_000, q: 0.7 },
  voices: [{
    node: 1,
    mode: 'tone',
    frequency: 1_000,
    release: 0.01,
    gain: 1,
    activeLow: true,
  }],
  outputGain: 1,
  source: { file: 'fixture.cpp', line: 1, netlist: 'fixture' },
};
const core = new GeneratedDiscreteAudioCore(48_000, 1, plan);
core.write(1, 0);
const triggered = Array.from({ length: 9_600 }, () => core.sample());
assert.ok(Math.max(...triggered.slice(0, 480).map(Math.abs)) > 0.3);
assert.ok(Math.max(...triggered.slice(-480).map(Math.abs)) < 0.001);

core.write(1, 1);
core.write(1, 0);
const retriggered = Array.from({ length: 480 }, () => core.sample());
assert.ok(Math.max(...retriggered.map(Math.abs)) > 0.3);

console.log('discrete-effects.spec: RC effects decay while held and retrigger on a new edge');

const dacPlan: GeneratedDiscreteEffectsPlan = {
  ...plan,
  voices: [],
  dac: { node: 7, gain: 1, filterFrequency: 8_000, q: 0.7 },
  dischargeNode: 8,
  dischargeRelease: 0.005,
};
const dacCore = new GeneratedDiscreteAudioCore(48_000, 1, dacPlan);
dacCore.write(8, 1);
let enabledPeak = 0;
for (let index = 0; index < 480; index++) {
  dacCore.write(7, index & 1 ? 0 : 255);
  enabledPeak = Math.max(enabledPeak, Math.abs(dacCore.sample()));
}
dacCore.write(8, 0);
let decayedPeak = 0;
for (let index = 0; index < 4_800; index++) {
  dacCore.write(7, index & 1 ? 0 : 255);
  const sample = Math.abs(dacCore.sample());
  if (index >= 4_320) decayedPeak = Math.max(decayedPeak, sample);
}
assert.ok(enabledPeak > 0.05);
assert.ok(decayedPeak < enabledPeak / 1_000);

console.log('discrete-effects.spec: source-derived DAC discharge gate decays idle samples');
