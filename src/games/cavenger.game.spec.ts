import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { cavenger } from './cavenger.game.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(cavenger);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === cavenger.machine.className &&
  node.props.name === cavenger.machine.name);
assert.ok(machine);

const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video?.plan.palette, 'Cosmic Avenger palette PROM must lower');
assert.ok(video.plan.gfx.length > 0, 'Cosmic Avenger decoded graphics must lower');
assert.ok(
  video.plan.gfx.every(entry => entry.decodeMember === 'm_gfxdecode'),
  'string-tagged GFXDECODE must bind character graphics to m_gfxdecode',
);
assert.deepEqual(
  video.plan.palette.channels.map(channel => ({
    channel: channel.channel,
    bits: channel.bits,
    inverted: channel.inverted,
  })),
  [
    { channel: 'r', bits: [0, 5], inverted: [true, true] },
    { channel: 'g', bits: [2, 6], inverted: [true, true] },
    { channel: 'b', bits: [4, 7], inverted: [true, true] },
  ],
);
const banks = video.plan.palette.banks;
assert.deepEqual(
  banks[0]?.colorMap?.slice(0, 8),
  [0, 8, 16, 24, 1, 9, 17, 25],
  'character color address lines must retain their non-linear permutation',
);
assert.equal(banks[1]?.colorMap?.[0x01], 8, 'low sprite nibble must be bit-reversed');
assert.equal(banks[1]?.colorMap?.[0x10], 0, 'low sprite bank must ignore the high nibble');
assert.equal(banks[2]?.colorMap?.[0x01], 0, 'high sprite bank must ignore the low nibble');
assert.equal(banks[2]?.colorMap?.[0x10], 8, 'high sprite nibble must be bit-reversed');

console.log('cavenger.spec: source machine graph and inverted palette PROM passed');
