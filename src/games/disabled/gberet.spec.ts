import assert from 'node:assert/strict';
import { compileMameVideo } from '../../mame/video-compiler.ts';
import { gberet } from './gberet.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from '../test-support.ts';

assertGameContract(gberet);
const graph = gameSourceGraph(gberet);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === gberet.machine.className &&
  node.props.name === gberet.machine.name);
assert.ok(machine);
assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === 'Z80'));
assert.ok(graph.nodes.some(node => node.label === 'Device' && node.props.type === 'SN76489A'));
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Green Beret video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
assert.equal(video.plan.tilemaps[0]?.tileInfo, 'gberet_base_state.get_bg_tile_info');

console.log('gberet.spec: Z80, SN76489 and video passed');
