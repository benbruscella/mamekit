import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { jumpbug } from './jumpbug.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(jumpbug);
const graph = gameSourceGraph(jumpbug);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === jumpbug.machine.className &&
  node.props.name === jumpbug.machine.name);
assert.ok(machine);
const types = graph.nodes.filter(node => node.label === 'Device').map(node => node.props.type);
assert.ok(types.includes('Z80'));
assert.ok(types.includes('AY8910'));
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Jump Bug Galaxian video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('jumpbug.spec: Z80, AY8910 and Galaxian video passed');
