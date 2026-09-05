import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { crush } from './crush.game.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(crush);
const graph = gameSourceGraph(crush);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === crush.machine.className &&
  node.props.name === crush.machine.name);
assert.ok(machine);
const types = graph.nodes.filter(node => node.label === 'Device').map(node => node.props.type);
assert.ok(types.includes('Z80'));
assert.ok(types.includes('NAMCO_WSG'));
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Crush Roller video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('crush.spec: Pac-Man-family CPU, WSG and video passed');
