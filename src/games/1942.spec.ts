import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { _1942 } from './1942.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(_1942);
const graph = gameSourceGraph(_1942);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === _1942.machine.className &&
  node.props.name === _1942.machine.name);
assert.ok(machine);
const types = graph.nodes.filter(node => node.label === 'Device').map(node => node.props.type);
assert.equal(types.filter(type => type === 'Z80').length, 2);
assert.equal(types.filter(type => type === 'AY8910').length, 2);
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, '1942 video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
assert.equal(video.plan.palette?.region, 'palproms');
assert.deepEqual(
  video.plan.palette?.banks.map(bank => [bank.penOffset, bank.lookupTerms?.[0]?.region]),
  [[0, 'charprom'], [0x100, 'tileprom'], [0x200, 'tileprom'],
    [0x300, 'tileprom'], [0x400, 'tileprom'], [0x500, 'sprprom']],
);

console.log('1942.spec: dual Z80, dual AY8910 and source video passed');
