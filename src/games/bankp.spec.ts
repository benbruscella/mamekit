import assert from 'node:assert/strict';
import { inputKeys } from '../gen/generate.ts';
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
assert.deepEqual(
  video.plan.palette?.banks.map(bank => ({
    penOffset: bank.penOffset,
    lookupOffset: bank.lookupOffset,
    lookupCount: bank.lookupCount,
    colorOr: bank.colorOr,
  })),
  [
    { penOffset: 0, lookupOffset: 32, lookupCount: 128, colorOr: 0 },
    { penOffset: 128, lookupOffset: 32, lookupCount: 128, colorOr: 16 },
    { penOffset: 256, lookupOffset: 288, lookupCount: 128, colorOr: 0 },
    { penOffset: 384, lookupOffset: 288, lookupCount: 128, colorOr: 16 },
  ],
);
assert.deepEqual(
  [1, 2, 3].map(button => inputKeys('bankp', `IPT_BUTTON${button}`)),
  [['KeyZ'], ['KeyX'], ['KeyC']],
);

console.log('bankp.spec: triple SN76489, Z/X/C controls and dual-tilemap video passed');
