import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { frogger } from './frogger.game.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(frogger);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === frogger.machine.className &&
  node.props.name === frogger.machine.name);
assert.ok(machine);
for (const type of ['Z80', 'I8255A', 'AY8910', 'NETLIST_SOUND']) {
  assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === type));
}
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video);
assert.equal(
  video.plan.initialState.m_frogger_adjust,
  1,
  'init_frogger must retain the nibble-swapped sprite-position hardware flag',
);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('frogger.spec: Konami sound and Galaxian-derived video passed');
