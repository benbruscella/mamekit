import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { dkong } from './dkong.game.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

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
assert.deepEqual(video.plan.palette?.forceBlack, { mask: 0x03, value: 0x00 });
assert.deepEqual(video.plan.palette?.resNet?.amplifiers, [
  'darlington',
  'darlington',
  'emitter',
]);
assert.deepEqual(video.plan.palette?.normalize, {
  start: 0,
  end: 255,
  lumMin: 0,
  lumMax: 255,
});
console.log('dkong.spec: DMA and Nintendo video passed');
