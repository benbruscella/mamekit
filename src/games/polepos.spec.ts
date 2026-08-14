import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { compilePoleposDiscrete } from '../mame/audio-compiler.ts';
import { polepos } from './polepos.ts';
import { sourceNvramInitializers } from '../gen/generate.ts';
import {
  gameSourceGraph,
  mameSourceRoot,
} from './test-support.ts';

const graph = gameSourceGraph(polepos);
assert.deepEqual(sourceNvramInitializers(graph.nodes, mameSourceRoot()), [
  { share: 'nvram', fill: 0xff },
]);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === polepos.machine.className &&
  node.props.name === polepos.machine.name);
assert.ok(machine);

const compiled = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(compiled, 'Pole Position MAME video source must lower to executable video IR');
assert.equal(compiled.plan.tilemaps.length, 2);
assert.deepEqual(compiled.plan.palette?.banks.map(({ lookupTerms: _, ...bank }) => bank), [
  { penOffset: 0, colorOr: 0x20, lookupOffset: 0x300, lookupCount: 0x100,
    lookupValueOverride: 0x0f, overrideColor: 0x2f },
  { penOffset: 0x100, colorOr: 0x60, lookupOffset: 0x300, lookupCount: 0x100,
    lookupValueOverride: 0x0f, overrideColor: 0x2f },
  { penOffset: 0x200, colorOr: 0, lookupOffset: 0x400, lookupCount: 0x100 },
  { penOffset: 0x300, colorOr: 0x10, lookupOffset: 0xc00, lookupCount: 0x400,
    lookupValueOverride: 0x0f, overrideColor: 0x1f },
  { penOffset: 0x700, colorOr: 0x50, lookupOffset: 0xc00, lookupCount: 0x400,
    lookupValueOverride: 0x0f, overrideColor: 0x1f },
  { penOffset: 0xb00, colorOr: 0x40, lookupOffset: 0x800, lookupCount: 0x400 },
]);
assert.ok(compiled.handlers.some(handler =>
  handler.method === 'draw_sprites' && handler.program?.diagnostics.length === 0));
assert.ok(compiled.handlers.some(handler =>
  handler.method === 'draw_road' && handler.program?.diagnostics.length === 0));

const discrete = compilePoleposDiscrete(
  mameSourceRoot(),
  polepos.driver,
  'polepos_discrete',
);
assert.equal(discrete.channels.length, 4, 'the 52XX channel must not be dropped');
assert.ok(discrete.channels.slice(0, 3).every(channel =>
  channel.gain < 0 && channel.clamp?.minimum === -2 && channel.clamp.maximum === 1.5));
assert.ok(Math.abs(discrete.outputGain - (32767 / 2 / 32768 * 0.9)) < 1e-12);
assert.deepEqual(discrete.channels[3]?.stages?.map(stage => stage.type), [
  'highpass',
  'lowpass',
]);

console.log('polepos.spec: game token and MAME-source video contract passed');
