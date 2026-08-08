import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { gunsmoke } from './gunsmoke.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(gunsmoke);
const graph = gameSourceGraph(gunsmoke);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === gunsmoke.machine.className &&
  node.props.name === gunsmoke.machine.name);
assert.ok(machine);
const types = graph.nodes.filter(node => node.label === 'Device').map(node => node.props.type);
assert.equal(types.filter(type => type === 'Z80').length, 2);
assert.equal(types.filter(type => type === 'YM2203').length, 2);
assert.ok(types.includes('BUFFERED_SPRITERAM8'));
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Gun.Smoke video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));
assert.deepEqual(video.plan.palette?.banks.map(bank => bank.colorOr), [0x40, 0, 0x80]);
assert.deepEqual(video.plan.palette?.banks[1]?.lookupTerms, [
  { region: 'proms', offset: 0x400, mask: 0xff, shift: 0 },
  { region: 'proms', offset: 0x500, mask: 0x03, shift: 4 },
]);

console.log('gunsmoke.spec: dual Z80, dual YM2203 and buffered-sprite video passed');
