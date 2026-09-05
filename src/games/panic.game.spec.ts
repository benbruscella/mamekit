import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { generatedDirectScreenShape } from '../runtime/generated-video.ts';
import { panic } from './panic.game.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(panic);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === panic.machine.className &&
  node.props.name === panic.machine.name);
assert.ok(machine);
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video);
assert.deepEqual(video.plan.palette?.indexedColors?.[0]?.colors.slice(0, 16), [
  0xff000000, 0xff0000ff, 0xff00ff00, 0xff00ffff,
  0xffff0000, 0xffff00ff, 0xffffff00, 0xffffffff,
  0xffaa0000, 0xffaa00ff, 0xffaaff00, 0xffaaffff,
  0xffff0000, 0xffff00ff, 0xffffff00, 0xffffffff,
]);
assert.equal(
  generatedDirectScreenShape({
    execution: { screenUpdate: { handler: 'cosmic_state.screen_update_panic' } },
    handlers: video.handlers,
  } as never),
  'cosmic-bitmap-sprites',
);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
console.log('panic.spec: indexed palette and bitmap/sprite video passed');
