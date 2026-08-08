import assert from 'node:assert/strict';
import { compilePhoenixSound } from '../mame/phoenix-audio-compiler.ts';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { phoenix } from './phoenix.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(phoenix);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === phoenix.machine.className &&
  node.props.name === phoenix.machine.name);
assert.ok(machine);
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.equal(video?.plan.palette?.colorCount, 256);
assert.equal(video?.plan.tilemaps?.length, 2);

const sound = compilePhoenixSound(mameSourceRoot(), {
  type: 'PHOENIX_SOUND',
  className: 'phoenix_sound_device',
  sourceFile: 'src/mame/phoenix/phoenix_a.cpp',
  sourceLine: 51,
  sourceColumn: 1,
  macro: 'DEFINE_DEVICE_TYPE',
});
assert.deepEqual(sound.melody.tunes.map(tune => tune.length), [0, 576, 576, 576, 78]);
assert.deepEqual(sound.routes, { melody: 0.5, custom: 0.4, effects: 0.6 });
assert.deepEqual(sound.methods, { controlA: 'control_a_w', controlB: 'control_b_w' });
console.log('phoenix.spec: PROM palette, two-page video and source audio passed');
