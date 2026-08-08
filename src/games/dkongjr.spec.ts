import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { dkongjr } from './dkongjr.ts';
import { assertGameContract, gameSourceGraph, mameSourceRoot } from './test-support.ts';

assertGameContract(dkongjr);
const graph = gameSourceGraph(dkongjr);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === dkongjr.machine.className &&
  node.props.name === dkongjr.machine.name);
assert.ok(machine);
const devices = graph.nodes.filter(node => node.label === 'Device');
assert.ok(devices.some(node => node.props.type === 'Z80' && node.props.tag === 'maincpu'));
assert.ok(devices.some(node => node.props.type === 'MB8884' && node.props.tag === 'soundcpu'));
assert.ok(devices.some(node => node.props.type === 'DISCRETE'));
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Donkey Kong Jr. video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('dkongjr.spec: Z80, MB8884, discrete audio and video passed');
