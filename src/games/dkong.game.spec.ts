import assert from 'node:assert/strict';
import { sourceFileAggregates } from '../mame/static-aggregate.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { dkong } from './dkong.game.ts';
import { assertPaletteCallback, gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(dkong);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === dkong.machine.className &&
  node.props.name === dkong.machine.name);
assert.ok(machine);
for (const type of ['Z80', 'I8257', 'MB8884', 'DISCRETE']) {
  assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === type));
}
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
// dkong2b_palette runs as written: resnet.cpp's compute_res_net_all and
// compute_res_net over the file's own res_net_info tables, then the tri-state
// black and normalize_range it applies itself.
assertPaletteCallback(video, { handler: 'dkong_state.dkong2b_palette', entries: 521 });
// The tables are data, field by field through resnet.h's structs: the blue
// channel is an emitter follower over two resistors.
const tables = sourceFileAggregates(mameSourceRoot(), 'src/mame/nintendo/dkong_v.cpp');
const net = tables.lower('dkong_net_info') as { rgb: { options: number; rBias: number; num: number; R: number[] }[] };
assert.deepEqual(
  net.rgb.map(channel => [channel.options, channel.rBias, channel.num, channel.R.slice(0, channel.num)]),
  [[2, 470, 3, [1000, 470, 220]], [2, 470, 3, [1000, 470, 220]], [3, 680, 2, [470, 220]]],
);
console.log('dkong.spec: DMA and Nintendo video passed');
