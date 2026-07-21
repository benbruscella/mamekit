import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as ts from 'typescript';
import {
  compileGalaxianDiscrete,
  generatedGalaxianDiscreteWorkletSource,
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
const audio = compileGalaxianDiscrete(mameSrc, definition);
assert.deepEqual(audio.methodBases, {
  lfo_freq_w: 0,
  pitch_w: 0x100,
  sound_w: 0x200,
});
assert.equal(audio.clockDivider, 2);
assert.deepEqual(audio.lfsr, { bits: 17, reset: 0, tap0: 4, tap1: 16 });
assert.deepEqual(audio.lfoResistors, [1_000_000, 470_000, 220_000, 100_000]);

const source = generatedGalaxianDiscreteWorkletSource(audio);
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
  GeneratedGalaxianDiscreteCore: new (
    rate: number,
    clock: number,
  ) => { write(offset: number, data: number): void; render(output: Float32Array): void };
};
const core = new generated.GeneratedGalaxianDiscreteCore(48_000, 3_072_000);
core.write(audio.methodBases.sound_w + 3, 1);
const samples = new Float32Array(4096);
core.render(samples);
assert.ok(samples.some(sample => sample !== 0));
assert.ok(samples.every(sample => Number.isFinite(sample) && Math.abs(sample) <= 1));

console.log('galaxian.spec: source-derived tilemap, starfield and discrete audio passed');
