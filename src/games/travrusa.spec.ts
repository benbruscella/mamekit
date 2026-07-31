import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { travrusa } from './travrusa.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(travrusa);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === travrusa.machine.className &&
  node.props.name === travrusa.machine.name);
assert.ok(machine);
for (const type of ['Z80', 'M6803', 'AY8910', 'MSM5205']) {
  assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === type));
}
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('travrusa.spec: Irem M52 audio and tile/sprite video passed');
