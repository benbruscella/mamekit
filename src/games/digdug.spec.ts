import assert from 'node:assert/strict';
import { compileMameDevice } from '../mame/device-compiler.ts';
import { indexMameHardware } from '../mame/hardware.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { digdug } from './digdug.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(digdug);
const mameSrc = mameSourceRoot();
const graph = gameSourceGraph(digdug);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === digdug.machine.className &&
  node.props.name === digdug.machine.name);
assert.ok(machine);

const types = new Set(
  graph.nodes
    .filter(node => node.label === 'Device')
    .map(node => String(node.props.type)),
);
for (const type of [
  'Z80', 'NAMCO_06XX', 'NAMCO_51XX', 'NAMCO_53XX', 'NAMCO_WSG', 'ER2055', 'LS259',
]) {
  assert.ok(types.has(type), `Dig Dug graph must extract ${type}`);
}

const video = compileMameVideo(graph, mameSrc, machine.id);
assert.ok(video, 'Dig Dug board-local MAME video source must lower to video IR');
assert.equal(video.plan.source?.file, 'src/mame/namco/digdug.cpp');
assert.deepEqual(video.plan.gfx.map(entry => entry.region), ['gfx1', 'gfx2', 'gfx3']);
assert.deepEqual(video.plan.tilemaps.map(tilemap => tilemap.member), [
  'm_bg_tilemap',
  'm_fg_tilemap',
]);
assert.deepEqual(video.plan.palette?.banks, [
  {
    penOffset: 0,
    penStride: 2,
    colorOr: 0,
    colorStride: 0,
    lookupOffset: 0,
    lookupCount: 16,
    direct: true,
  },
  {
    penOffset: 1,
    penStride: 2,
    colorOr: 0,
    lookupOffset: 0,
    lookupCount: 16,
    direct: true,
  },
  { penOffset: 32, colorOr: 16, lookupOffset: 32, lookupCount: 256 },
  { penOffset: 288, colorOr: 0, lookupOffset: 288, lookupCount: 256 },
]);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
assert.match(
  video.handlers.find(handler => handler.method === 'bg_get_tile_info')?.body ?? '',
  /memregion\("gfx4"\)->base\(\)/,
);

const hardware = indexMameHardware(mameSrc);
const namco06 = compileMameDevice(mameSrc, hardware.get('NAMCO_06XX')!);
assert.equal(namco06.summary.diagnostics, 0, 'NAMCO_06XX must compile clean');
assert.equal(namco06.summary.compiledMethods, namco06.summary.methods);

console.log('digdug.spec: game token and MAME-source machine contract passed');
