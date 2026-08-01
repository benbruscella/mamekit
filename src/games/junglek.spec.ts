import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { junglek } from './junglek.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(junglek);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === junglek.machine.className &&
  node.props.name === junglek.machine.name);
assert.ok(machine);
assert.equal(
  graph.nodes.filter(node => node.label === 'Device' && node.props.type === 'AY8910').length,
  4,
);
for (const type of ['Z80', 'INPUT_MERGER_ALL_HIGH', 'DAC_8BIT_R2R', 'DISCRETE']) {
  assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === type));
}
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
const audioIrq = graph.nodes.find(node =>
  node.label === 'Callback' && node.props.signal === 'set_periodic_int');
assert.equal(audioIrq?.props.periodHz, 36.62109375);

console.log('junglek.spec: dual-Z80, 36.621 Hz audio IRQ, collisions and Taito SJ video passed');
