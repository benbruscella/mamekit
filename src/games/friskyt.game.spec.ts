import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { sourceNvramInitializers } from '../gen/generate.ts';
import { friskyt } from './friskyt.game.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(friskyt);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === friskyt.machine.className &&
  node.props.name === friskyt.machine.name);
assert.ok(machine);
for (const type of ['Z80', 'NSC8105', 'AY8910', 'DAC_4BIT_R2R']) {
  assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === type));
}
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
assert.deepEqual(sourceNvramInitializers(graph.nodes, mameSourceRoot()), [{
  share: 'nvram',
  bytes: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1,
    0, 1, 0, 1, 0, 1, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0,
  ],
}]);

console.log('friskyt.spec: MCU, AY/DAC sound and row-scroll video passed');
