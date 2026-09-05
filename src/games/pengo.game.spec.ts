import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { pengo } from './pengo.game.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(pengo);
const graph = gameSourceGraph(pengo);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === pengo.machine.className &&
  node.props.name === pengo.machine.name);
assert.ok(machine);
const types = graph.nodes.filter(node => node.label === 'Device').map(node => node.props.type);
assert.ok(types.includes('Z80'));
assert.ok(types.includes('NAMCO_WSG'));
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Pengo video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('pengo.spec: unencrypted Z80, Namco WSG and video passed');
