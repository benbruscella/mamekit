import assert from 'node:assert/strict';
import { compileMameVideo } from '../../mame/video-compiler.ts';
import { trackfld } from './trackfld.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from '../test-support.ts';

assertGameContract(trackfld);
const graph = gameSourceGraph(trackfld);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === trackfld.machine.className &&
  node.props.name === trackfld.machine.name);
assert.ok(machine);
const types = graph.nodes.filter(node => node.label === 'Device').map(node => node.props.type);
assert.ok(types.includes('KONAMI1'));
assert.ok(types.includes('Z80'));
assert.ok(types.includes('SN76489A'));
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Track & Field video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('trackfld.spec: Konami-1, Z80, SN76489 and video passed');
