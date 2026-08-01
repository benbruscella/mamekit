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

const vcoPlan: GeneratedDiscreteEffectsPlan = {
  ...plan,
  voices: [{
    node: 1,
    mode: 'tone',
    frequency: 303,
    vco: {
      modulationFrequency: 8.42,
      modulationResistance: 18_000,
      modulationParallelResistance: 3_300_000,
      modulationCapacitance: 3.3e-6,
      modulationType: 1,
      controlResistance1: 10_000,
      controlResistance2: 10_000,
      oscillatorResistance: 10_000,
      outputResistance: 1_200,
      controlCapacitance: 10e-6,
      timerResistance1: 47_000,
      timerResistance2: 27_000,
      timerCapacitance: 47e-9,
      supplyVoltage: 5,
    },
    release: 0.047,
    gain: 1,
    // DISCRETE_INPUT_NOT is downstream of this pre-inverter latch value.
    activeLow: false,
    triggerEdge: 'both',
  }],
};
const vcoCore = new GeneratedDiscreteAudioCore(48_000, 1, vcoPlan);
vcoCore.write(1, 0);
const idle = Array.from({ length: 48_000 }, () => vcoCore.sample());
assert.equal(Math.max(...idle.map(Math.abs)), 0);
vcoCore.write(1, 1);
const vcoTriggered = Array.from({ length: 9_600 }, () => vcoCore.sample());
assert.ok(Math.max(...vcoTriggered.slice(0, 2_400).map(Math.abs)) > 0.3);
assert.ok(Math.max(...vcoTriggered.slice(-2_400).map(Math.abs)) > 0.001);

console.log('discrete-effects.spec: pre-inverter edge drives source-derived VCO tail');

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
for (let index = 0; index < 4_800; index++) {
  dacCore.write(7, index % 24 < 12 ? 0 : 255);
  const sample = Math.abs(dacCore.sample());
  if (index >= 4_320) enabledPeak = Math.max(enabledPeak, sample);
}
dacCore.write(8, 0);
let decayedPeak = 0;
for (let index = 0; index < 4_800; index++) {
  dacCore.write(7, index % 24 < 12 ? 0 : 255);
  const sample = Math.abs(dacCore.sample());
  if (index >= 4_320) decayedPeak = Math.max(decayedPeak, sample);
}
assert.ok(enabledPeak > 0.05);
assert.ok(decayedPeak < enabledPeak / 1_000);

console.log('discrete-effects.spec: source-derived DAC discharge gate decays idle samples');
