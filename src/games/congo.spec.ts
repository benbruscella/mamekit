import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { congo } from './congo.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(congo);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === congo.machine.className &&
  node.props.name === congo.machine.name);
assert.ok(machine);

// Congo Bongo fits two SN76489As and clocks the second at a quarter of the
// first, so one clock for the pair is not the board MAME describes.
assert.deepEqual(
  graph.nodes
    .filter(node => node.label === 'Device' && node.props.type === 'SN76489A')
    .map(node => [node.props.tag, Number(node.props.clock)]),
  [['sn1', 4_000_000], ['sn2', 1_000_000]],
);

// Its sound board is a second Z80 reached through an 8255, unlike the Zaxxon
// machine config it shares a driver class with.
const devices = graph.nodes.filter(node => node.label === 'Device');
assert.ok(devices.some(node => node.props.type === 'I8255A' && node.props.tag === 'ppi8255'));
assert.deepEqual(
  devices.filter(node => node.props.type === 'Z80').map(node => node.props.tag),
  ['maincpu', 'audiocpu'],
);

const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video, 'Congo Bongo MAME video source must lower to executable video IR');
assert.ok(video.handlers.every(handler => !handler.program?.diagnostics.length));

console.log('congo.spec: split SN76489A clocks, 8255 sound board and video passed');
