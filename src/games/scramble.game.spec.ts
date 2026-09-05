import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { scramble } from './scramble.game.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(scramble);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === scramble.machine.className &&
  node.props.name === scramble.machine.name);
assert.ok(machine);
for (const type of ['Z80', 'I8255A', 'AY8910', 'NETLIST_SOUND']) {
  assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === type));
}
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('scramble.spec: dual-Z80 Konami hardware and Galaxian video passed');
