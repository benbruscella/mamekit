import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { kungfum } from './kungfum.ts';
import {
  assertGameContract,
  gameSourceGraph,
  mameSourceRoot,
} from './test-support.ts';

assertGameContract(kungfum);
const mameSrc = mameSourceRoot();
const graph = gameSourceGraph(kungfum);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === kungfum.machine.className &&
  node.props.name === kungfum.machine.name);
assert.ok(machine);

const deviceTypes = new Set(
  graph.nodes
    .filter(node => node.label === 'Device')
    .map(node => String(node.props.type)),
);
for (const type of ['Z80', 'M6803', 'AY8910', 'MSM5205', 'IREM_M62_AUDIO']) {
  assert.ok(deviceTypes.has(type), `Kung-Fu Master must extract ${type}`);
}

const maincpu = graph.nodes.find(node =>
  node.label === 'Device' && node.props.tag === 'maincpu');
assert.equal(maincpu?.props.clock, 3_072_000);
const screen = graph.nodes.find(node =>
  node.label === 'Device' && node.props.tag === 'screen');
assert.deepEqual(screen?.props.screenRaw, [
  6_144_000, 384, 128, 384, 284, 0, 256,
]);
assert.deepEqual(
  graph.nodes
    .filter(node =>
      node.label === 'Callback' &&
      node.props.signal === 'set_screen_update')
    .map(node => node.props.targetMethod),
  ['screen_update_kungfum'],
);

const video = compileMameVideo(graph, mameSrc, machine.id);
assert.ok(video, 'Kung-Fu Master MAME video source must lower to executable video IR');
assert.equal(
  video.plan.regionBindings?.m_sprite_height_prom,
  'spr_height_prom',
);
assert.deepEqual(video.plan.gfx.map(entry => entry.region), ['gfx2', 'gfx1']);
assert.deepEqual(video.plan.palettes?.map(palette => ({
  member: palette.member,
  region: palette.plan.region,
})), [
  { member: 'm_spr_palette', region: 'spr_color_proms' },
  { member: 'm_chr_palette', region: 'chr_color_proms' },
]);
assert.equal(video.plan.tilemaps[0]?.tileInfo, 'm62_state.get_kungfum_bg_tile_info');
assert.equal(video.plan.tilemaps[0]?.scrollRows, 32);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('kungfum.spec: game token and MAME-source M62 machine contract passed');
