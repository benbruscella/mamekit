import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { bankp } from './bankp.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(bankp);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === bankp.machine.className &&
  node.props.name === bankp.machine.name);
assert.ok(machine);
assert.equal(
  graph.nodes.filter(node => node.label === 'Device' && node.props.type === 'SN76489A').length,
  3,
);
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video);
assert.equal(video.plan.tilemaps.length, 2);
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('bankp.spec: triple SN76489 and dual-tilemap video passed');
