import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as ts from 'typescript';
import {
  compileCounterLfsrDiscrete,
  generatedCounterLfsrDiscreteWorkletSource,
} from '../mame/audio-compiler.ts';
import { deviceDefinitionsFromSource } from '../mame/hardware.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { galaxian } from './galaxian.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(galaxian);
const mameSrc = mameSourceRoot();
const graph = gameSourceGraph(galaxian);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === galaxian.machine.className &&
  node.props.name === galaxian.machine.name);
assert.ok(machine);

const video = compileMameVideo(graph, mameSrc, machine.id);
assert.ok(video, 'Galaxian MAME video source must lower to executable video IR');
assert.deepEqual(video.plan.renderScale, { x: 3, y: 1 });
assert.equal(video.plan.initialState.m_irq_line, -1);
assert.deepEqual(video.plan.tilemaps.map(tilemap => ({
  mapper: tilemap.mapper,
  scrollColumns: tilemap.scrollColumns,
  transparentPen: tilemap.transparentPen,
})), [{ mapper: 'TILEMAP_SCAN_ROWS', scrollColumns: 32, transparentPen: 0 }]);
assert.equal(video.plan.palette?.banks[0]?.direct, true);
assert.deepEqual(video.plan.delegates, {
  m_draw_bullet_ptr: 'galaxian_state.galaxian_draw_bullet',
  m_draw_background_ptr: 'galaxian_state.galaxian_draw_background',
  m_extend_tile_info_ptr: 'galaxian_state.empty_extend_tile_info',
  m_extend_sprite_info_ptr: 'galaxian_state.empty_extend_sprite_info',
});
assert.deepEqual(video.plan.lfsrTable, {
  member: 'm_stars',
  period: 131071,
  enabledMask: 0x1fe01,
  enabledValue: 0x1fe00,
  colorMask: 0x1f8,
  colorShift: 3,
  feedbackTap: 12,
  feedbackInvertTap: 0,
  feedbackWidth: 17,
  rowRenderer: {
    method: 'stars_draw_row',
    colorMember: 'm_star_color',
    scaleMember: 'm_x_scale',
  },
});
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

const audioFile = 'src/mame/galaxian/galaxian_a.cpp';
const audioText = readFileSync(join(mameSrc, audioFile), 'utf8');
const definition = deviceDefinitionsFromSource(audioFile, audioText)
  .find(candidate => candidate.type === 'GALAXIAN_SOUND');
assert.ok(definition);
const audio = compileCounterLfsrDiscrete(mameSrc, definition);
assert.equal(audio.type, 'COUNTER_LFSR_DISCRETE');
assert.equal(audio.processorName, 'discrete');
assert.equal(audio.workletName, 'galaxian-sound');
assert.deepEqual(audio.methodBases, {
  lfo_freq_w: 0,
  pitch_w: 0x100,
  sound_w: 0x200,
});
assert.deepEqual(audio.methodRoles, {
  pitch: 'pitch_w',
  lfo: 'lfo_freq_w',
  controls: 'sound_w',
});
assert.deepEqual(audio.controls, {
  background: [0, 1, 2],
  noise: 3,
  fire: 5,
  volume: [6, 7],
});
assert.equal(audio.clockDivider, 2);
assert.deepEqual(audio.lfsr, { bits: 17, reset: 0, tap0: 4, tap1: 16 });
assert.deepEqual(audio.lfoResistors, [1_000_000, 470_000, 220_000, 100_000]);
assert.deepEqual(audio.backgroundLfo, {
  bitVoltage: 4,
  biasVoltage: 4.4,
  biasResistance: 15_000,
  groundResistance: 330_000,
  currentResistance: 100_000,
  capacitance: 1e-6,
  supplyVoltage: 5,
  junctionVoltage: 0.7,
  controlGain: 1.4255319148936172,
  controlOffset: -1.0638297872340425,
  controlMinimum: 0,
  controlMaximum: 5,
});
assert.deepEqual(audio.background555, {
  chargeResistors: [100_000, 100_000, 100_000],
  dischargeResistors: [470_000, 330_000, 220_000],
  capacitors: [1e-8, 1e-8, 1e-8],
  supplyVoltage: 5,
  outputHighVoltage: 4.5,
  mixerResistances: [10_000, 10_000, 10_000],
  filterCapacitance: 1e-7,
});
assert.deepEqual(audio.hitFilter, {
  resistance: 172_000,
  capacitance: 2.2e-6,
  inputVoltage: 4,
  diodeDrop: 0.7,
  bandpass: {
    inputResistance: 150_000,
    biasResistance: 22_000,
    feedbackResistance: 470_000,
    capacitance1: 1e-8,
    capacitance2: 1e-8,
    referenceVoltage: 2,
    positiveVoltage: 5,
    negativeVoltage: 0,
    positiveRailOffset: 1.5,
  },
  mixGain: 0.5379746835443038,
});

const source = generatedCounterLfsrDiscreteWorkletSource(audio);
assert.match(source, /export class GeneratedDiscreteAudioCore/);
assert.doesNotMatch(source, /GeneratedGalaxian/);
const javaScript = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
}).outputText;
const globals = globalThis as Record<string, unknown>;
globals.AudioWorkletProcessor = class {};
globals.sampleRate = 48_000;
globals.registerProcessor = () => {};
const generated = await import(
  `data:text/javascript;base64,${Buffer.from(javaScript).toString('base64')}`
) as {
  GeneratedDiscreteAudioCore: new (
    rate: number,
    clock: number,
  ) => { write(offset: number, data: number): void; render(output: Float32Array): void };
};
const core = new generated.GeneratedDiscreteAudioCore(48_000, 3_072_000);
core.write(audio.methodBases.sound_w + 3, 1);
const burst = new Float32Array(4_800);
core.render(burst);
core.write(audio.methodBases.sound_w + 3, 0);
const tail = new Float32Array(96_000);
core.render(tail);
const rms = (samples: Float32Array): number => Math.sqrt(
  samples.reduce((sum, sample) => sum + sample * sample, 0) / samples.length,
);
const earlyTail = tail.slice(0, 12_000);
const lateTail = tail.slice(-12_000);
assert.ok(rms(burst) > 0.01, 'RCDISC5 hit circuit must produce an audible burst');
assert.ok(rms(earlyTail) > rms(lateTail) * 2, 'RCDISC5 hit tail must decay after release');
assert.ok(burst.every(sample => Number.isFinite(sample) && Math.abs(sample) <= 1));
assert.ok(tail.every(sample => Number.isFinite(sample) && Math.abs(sample) <= 1));

const fleetCore = new generated.GeneratedDiscreteAudioCore(48_000, 3_072_000);
for (let bit = 0; bit < 4; bit++) {
  fleetCore.write(audio.methodBases.lfo_freq_w + bit, 1);
}
fleetCore.write(audio.methodBases.sound_w + audio.controls.background[0]!, 1);
const fleet = new Float32Array(48_000 * 4);
fleetCore.render(fleet);
const steadyFleet = fleet.slice(48_000);
const crossingCounts: number[] = [];
for (let start = 0; start < steadyFleet.length; start += 2_400) {
  const block = steadyFleet.subarray(start, start + 2_400);
  let crossings = 0;
  for (let index = 1; index < block.length; index++) {
    if (block[index - 1]! <= 0 && block[index]! > 0) crossings++;
  }
  crossingCounts.push(crossings);
}
const sweepWraps = crossingCounts.slice(1).filter(
  (count, index) => count - crossingCounts[index]! >= 4,
).length;
const fleetValues = new Set(
  steadyFleet.map(sample => Math.round(sample * 1_000_000)),
);
assert.ok(Math.min(...crossingCounts) <= 7 && Math.max(...crossingCounts) >= 12,
  'background 555 frequency must follow the full control-voltage sweep');
assert.ok(sweepWraps >= 1 && sweepWraps <= 3,
  'background sweep must use the slow constant-current 555, not audio-rate modulation');
assert.ok(fleetValues.size > 5_000,
  'background output must include 555 energy timing and mixer filtering');
assert.ok(rms(steadyFleet) > 0.03 && rms(steadyFleet) < 0.1);
assert.ok(steadyFleet.every(sample => Number.isFinite(sample) && Math.abs(sample) <= 1));

console.log('galaxian.spec: source-derived tilemap, starfield and discrete audio passed');
