import assert from 'node:assert/strict';
import { compileMameVideo } from '../../mame/video-compiler.ts';
import { rygar } from './rygar.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from '../test-support.ts';

assertGameContract(rygar);
const graph = gameSourceGraph(rygar);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === rygar.machine.className &&
  node.props.name === rygar.machine.name);
assert.ok(machine);
const types = graph.nodes.filter(node => node.label === 'Device').map(node => node.props.type);
assert.equal(types.filter(type => type === 'Z80').length, 2);
assert.ok(types.includes('YM3526'));
assert.ok(types.includes('MSM5205'));
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Rygar video source must lower to executable video IR');
assert.deepEqual(
  video.plan.tilemaps.map(tilemap => [tilemap.member, tilemap.tileInfo]),
  [
    ['m_bg_tilemap', 'tecmo_state.get_bg_tile_info'],
    ['m_fg_tilemap', 'tecmo_state.get_fg_tile_info'],
    ['m_tx_tilemap', 'tecmo_state.get_tx_tile_info'],
  ],
);
assert.deepEqual(video.plan.tilemaps[0]?.scrollDx, [-48, 304]);

console.log('rygar.spec: dual Z80, YM3526/MSM5205 and selected video branch passed');
