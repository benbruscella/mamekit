import assert from 'node:assert/strict';
import { compileMameVideo } from '../mame/video-compiler.ts';
import { xevious } from './xevious.ts';
import { gameSourceGraph, mameSourceRoot } from './test-support.ts';

const graph = gameSourceGraph(xevious);
const machine = graph.nodes.find(node =>
  node.label === 'MachineConfig' &&
  node.props.cls === xevious.machine.className &&
  node.props.name === xevious.machine.name);
assert.ok(machine);
const video = compileMameVideo(graph, mameSourceRoot(), machine.id);
assert.ok(video?.plan.palette, 'Xevious palette PROM must lower');
assert.deepEqual(
  video.plan.palette.banks.map(bank => ({
    penOffset: bank.penOffset,
    lookupCount: bank.lookupCount,
    termOffsets: bank.lookupTerms?.map(term => term.offset),
    direct: bank.direct,
  })),
  [
    { penOffset: 0, lookupCount: 512, termOffsets: [768, 1280], direct: undefined },
    { penOffset: 512, lookupCount: 512, termOffsets: [1792, 2304], direct: undefined },
    { penOffset: 1024, lookupCount: 128, termOffsets: undefined, direct: true },
  ],
  'TOTAL_COLORS and gfx colorbase expressions must retain all three pen banks',
);
const [, sprites, foreground] = video.plan.palette.banks;
assert.deepEqual(
  [
    sprites?.colorMap?.[0x00],
    sprites?.colorMap?.[0x7f],
    sprites?.colorMap?.[0x80],
    sprites?.colorMap?.[0xff],
  ],
  [0x80, 0x80, 0x00, 0x7f],
  'sprite opacity bit must select Xevious indirect color 0x80',
);
assert.deepEqual(
  foreground?.colorMap?.slice(0, 8),
  [0x80, 0x00, 0x80, 0x01, 0x80, 0x02, 0x80, 0x03],
  'foreground pen zero must map to the transparent indirect color',
);

console.log('xevious.spec: source machine graph and indirect palette banks passed');
